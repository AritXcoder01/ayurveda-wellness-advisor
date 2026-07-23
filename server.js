import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Create SMTP Transporter
// By default, creates an automated test transport with real preview URLs, or uses custom SMTP env vars if provided
let transporter;

async function initTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log(`[SMTP] Configured with custom credentials: ${process.env.SMTP_USER}`);
  } else {
    // Generate automated test SMTP account (Ethereal.email)
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
    console.log(`[SMTP] Ethereal test account created: ${testAccount.user}`);
  }
}

initTransporter().catch(console.error);

// API Endpoint to send real OTP verification email
app.post('/api/send-otp', async (req, res) => {
  const { email, name, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email and OTP code are required.' });
  }

  try {
    if (!transporter) {
      await initTransporter();
    }

    const mailOptions = {
      from: '"AyurVeda Life Security" <no-reply@ayurvedalife.com>',
      to: email,
      subject: `🌿 ${otp} is your AyurVeda Life Email Verification Code`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #051F20; color: #FFFFFF; padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid #8EB69B;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #FF9500; font-size: 24px; margin: 0;">AyurVeda Life</h1>
            <p style="color: #8EB69B; font-size: 14px; margin-top: 5px;">Personalized Wellness Advisor</p>
          </div>

          <div style="background: rgba(11, 43, 38, 0.9); padding: 20px; border-radius: 12px; border: 1px solid rgba(142, 182, 155, 0.3);">
            <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Hello ${name || 'Valued User'},</h2>
            <p style="color: #DAF1DE; font-size: 15px; line-height: 1.5;">
              Thank you for registering with AyurVeda Life. Please use the following 6-digit OTP verification code to confirm your email address:
            </p>

            <div style="text-align: center; margin: 25px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #FFB84D; background: #0B2B26; padding: 12px 24px; border-radius: 10px; letter-spacing: 6px; border: 1px solid #FF9500;">
                ${otp}
              </span>
            </div>

            <p style="color: #B8D8C2; font-size: 13px; text-align: center;">
              This verification code will expire in 10 minutes. If you did not request this code, please ignore this email.
            </p>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #8EB69B; font-size: 12px;">
            © ${new Date().getFullYear()} AyurVeda Life Advisor. All rights reserved.
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL DISPATCH] Sent to ${email} (Message ID: ${info.messageId})`);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[ETHEREAL INBOX PREVIEW] ${previewUrl}`);
    }

    res.json({
      success: true,
      message: `Verification email dispatched to ${email}`,
      messageId: info.messageId,
      previewUrl: previewUrl || null
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AyurVeda Email Backend running on http://localhost:${PORT}`);
});
