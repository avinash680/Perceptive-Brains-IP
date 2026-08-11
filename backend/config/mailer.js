const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: String(process.env.SMTP_SECURE) === 'true', // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on startup (logs only, does not block server boot).
transporter.verify((err) => {
  if (err) {
    console.error('SMTP connection failed:', err.message);
  } else {
    console.log('SMTP server is ready to send emails.');
  }
});

module.exports = transporter;