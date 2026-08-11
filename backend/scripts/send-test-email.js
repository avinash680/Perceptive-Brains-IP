require('dotenv').config();
const transporter = require('../config/mailer');

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
}

function getFromField() {
  return `"${process.env.MAIL_FROM_NAME || 'Website'}" <${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`;
}

async function run() {
  const admins = getAdminEmails();
  if (!admins.length) {
    console.error('No ADMIN_EMAILS configured in environment. Set ADMIN_EMAILS to a comma-separated list.');
    process.exit(1);
  }

  const mail = {
    from: getFromField(),
    to: admins.join(','),
    subject: 'Test admin notification',
    html: '<p>This is a test admin notification from the backend.</p>'
  };

  // Debug: log resolved env values (avoid printing secrets)
  console.log('DEBUG: SMTP_HOST=', process.env.SMTP_HOST);
  console.log('DEBUG: SMTP_PORT=', process.env.SMTP_PORT);
  console.log('DEBUG: ADMIN_EMAILS=', process.env.ADMIN_EMAILS);
  console.log('DEBUG: resolved admins=', admins);
  console.log('DEBUG: fromField=', mail.from);

  try {
    const info = await transporter.sendMail(mail);
    console.log('Test email sent:', info);
    process.exit(0);
  } catch (err) {
    console.error('Test email failed:', err && err.stack ? err.stack : err);
    process.exit(2);
  }
}

run();
