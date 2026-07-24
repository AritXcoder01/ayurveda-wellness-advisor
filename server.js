import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Persistent In-Memory Email Directory Log (Spotify-Style Verification Log)
const emailDirectory = [];

// GET /api/email-directory (Fetch full log of sent verification codes)
app.get('/api/email-directory', (req, res) => {
  res.json({
    success: true,
    totalSent: emailDirectory.length,
    directory: emailDirectory
  });
});

// POST /api/send-otp (Dispatch Email Code)
app.post('/api/send-otp', async (req, res) => {
  const { email, name, otp, purpose = 'Verification' } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Recipient Email and OTP code are required.' });
  }

  const timestamp = new Date().toISOString();
  let isRealInboxSent = false;
  let previewUrl = null;

  try {
    const user = process.env.GMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    let transporter = null;

    if (user && pass) {
      try {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        });
        
        // Verify transport connection
        await transporter.verify();
        isRealInboxSent = true;
        console.log(`[REAL MAIL SERVER] SMTP Connection Verified for ${user}`);
      } catch (authError) {
        console.warn(`[SMTP AUTH WARNING] Gmail credentials invalid (${authError.message}). Switching to Ethereal Sandbox fallback.`);
        transporter = null;
        isRealInboxSent = false;
      }
    }

    if (!transporter) {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const mailOptions = {
      from: `"AyurVeda Life Security" <${user || 'security@ayurvedalife.com'}>`,
      to: email,
      subject: `🌿 ${purpose}: Your Security Code is ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #E0F2FE; color: #042C28; padding: 32px; border-radius: 24px; max-width: 520px; margin: 0 auto; border: 2px solid #0D9488;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="background: linear-gradient(135deg, #0D9488, #10B981); display: inline-block; padding: 14px; border-radius: 18px; margin-bottom: 10px; box-shadow: 0 8px 20px rgba(13, 148, 136, 0.3);">
              <span style="font-size: 32px; color: #FFFFFF;">🌿</span>
            </div>
            <h1 style="color: #042C28; font-size: 26px; margin: 0; font-weight: 800;">AyurVeda Life</h1>
            <p style="color: #1B4D45; font-size: 14px; margin-top: 4px; font-weight: 600;">Personalized Mind-Body Health Advisor</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.95); padding: 26px; border-radius: 20px; border: 1px solid rgba(13, 148, 136, 0.3); box-shadow: 0 10px 30px rgba(13, 148, 136, 0.1);">
            <h2 style="color: #042C28; font-size: 18px; margin-top: 0;">Hello ${name || 'Valued Member'},</h2>
            <p style="color: #1B4D45; font-size: 15px; line-height: 1.6;">
              ${purpose === 'Password Reset' 
                ? 'We received a request to reset your password. Enter this verification code to authorize your password change:' 
                : 'Welcome! Enter this 6-digit security code to verify your email address:'}
            </p>

            <div style="text-align: center; margin: 28px 0;">
              <span style="font-size: 36px; font-weight: 900; color: #0D9488; background: #E6F7F5; padding: 14px 30px; border-radius: 16px; letter-spacing: 8px; border: 2px solid #0D9488; display: inline-block;">
                ${otp}
              </span>
            </div>

            <p style="color: #3D736A; font-size: 13px; text-align: center; margin-bottom: 0;">
              🔒 Code is valid for 10 minutes. Recorded in AyurVeda Life Security Directory.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    previewUrl = nodemailer.getTestMessageUrl(info);

    const logEntry = {
      id: 'dir_' + Date.now(),
      email,
      name: name || 'User',
      otp,
      purpose,
      timestamp,
      status: 'DISPATCHED',
      isRealInboxSent,
      previewUrl: previewUrl || null,
      messageId: info.messageId
    };

    emailDirectory.unshift(logEntry);
    if (emailDirectory.length > 50) emailDirectory.pop();

    console.log(`[EMAIL DISPATCH SUCCESS] Code ${otp} sent to ${email} (${purpose})`);

    res.json({
      success: true,
      message: `Verification code sent to ${email}`,
      otp,
      isRealInboxSent,
      previewUrl: previewUrl || null,
      logEntry
    });
  } catch (error) {
    console.error('[EMAIL DISPATCH FALLBACK]', error.message);
    
    const fallbackEntry = {
      id: 'dir_' + Date.now(),
      email,
      name: name || 'User',
      otp,
      purpose,
      timestamp,
      status: 'DIRECTORY_LOGGED',
      isRealInboxSent: false,
      error: error.message
    };
    emailDirectory.unshift(fallbackEntry);

    res.json({
      success: true,
      message: `Verification code generated for ${email}`,
      otp,
      isRealInboxSent: false,
      isFallback: true,
      logEntry: fallbackEntry
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Real Email Dispatch & Directory Server running on http://localhost:${PORT}`);
});
