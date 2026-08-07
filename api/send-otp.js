import nodemailer from 'nodemailer';

const emailDirectory = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, name, otp, purpose = 'Verification' } = req.body || {};

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Recipient Email and OTP code are required.' });
  }

  const timestamp = new Date().toISOString();
  let isRealInboxSent = false;
  let previewUrl = null;

  try {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    let transporter = null;

    if (user && pass) {
      try {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        });
        await transporter.verify();
        isRealInboxSent = true;
      } catch (e) {
        transporter = null;
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
      from: `"AyurVeda Life" <${process.env.GMAIL_USER || 'security@ayurvedalife.com'}>`,
      to: email,
      subject: `🌿 ${purpose}: Your Security Code is ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #F9FBF2; color: #1A3323; padding: 30px; border-radius: 20px; border: 2px solid #BAE164;">
          <h2 style="color: #1A3323;">AyurVeda Life Security</h2>
          <p>Hello ${name || 'User'},</p>
          <p>Your 6-digit security code for ${purpose} is:</p>
          <h1 style="color: #B86B18; font-size: 36px; letter-spacing: 6px;">${otp}</h1>
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
      previewUrl: previewUrl || null
    };

    emailDirectory.unshift(logEntry);

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${email}`,
      otp,
      isRealInboxSent,
      previewUrl: previewUrl || null,
      logEntry
    });
  } catch (error) {
    const fallbackEntry = {
      id: 'dir_' + Date.now(),
      email,
      name: name || 'User',
      otp,
      purpose,
      timestamp,
      status: 'DIRECTORY_LOGGED',
      isRealInboxSent: false
    };
    return res.status(200).json({
      success: true,
      message: `Verification code generated for ${email}`,
      otp,
      isRealInboxSent: false,
      isFallback: true,
      logEntry: fallbackEntry
    });
  }
}
