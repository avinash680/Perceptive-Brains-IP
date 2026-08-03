const nodemailer = require("nodemailer");

// Build SMTP transport configuration based on env variables.
// Fallback to Gmail configuration if SMTP_HOST is not provided.
const smtpConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587/25
  auth: {
    user: process.env.SMTP_USER || process.env.GMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD,
  },
};

// If using Google service helper specifically (when SMTP_HOST is omitted)
if (!process.env.SMTP_HOST && (process.env.GMAIL_USER || (smtpConfig.auth.user && smtpConfig.auth.user.includes("gmail.com")))) {
  smtpConfig.service = "gmail";
}

const transporter = nodemailer.createTransport(smtpConfig);

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date) =>
  date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

function withTimeout(operation, timeoutMs, fallbackValue) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallbackValue), timeoutMs);

    Promise.resolve()
      .then(operation)
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(fallbackValue);
      });
  });
}

async function sendAdminNotification({ name, email, phone, service, message, appNo, submittedAt }) {
  const emailFrom = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.GMAIL_USER;
  const adminEmail = process.env.ADMIN_EMAIL || emailFrom;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color:#1c1917;">
      <h2 style="color:#B45309; margin-bottom:4px;">New Consultation Application</h2>
      <p style="margin:0 0 12px 0;"><strong>Application No:</strong> ${escapeHtml(appNo)}</p>
      <p style="margin:0 0 12px 0;"><strong>Submitted:</strong> ${formatDate(submittedAt)}</p>
      <hr style="border:none; border-top:1px solid #e7e5e4;" />
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  return transporter.sendMail({
    from: `"IP Consultation Form" <${emailFrom}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Application ${appNo} - ${name}`,
    html,
  });
}

async function sendUserConfirmation({ name, email, service, appNo, submittedAt }) {
  const emailFrom = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.GMAIL_USER;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color:#1c1917;">
      <h2 style="color:#B45309; margin-bottom:4px;">Application Received</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for reaching out. Your consultation request has been received.</p>
      <p><strong>Application No:</strong> ${escapeHtml(appNo)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
      <p><strong>Submitted:</strong> ${formatDate(submittedAt)}</p>
      <p>A registered attorney will review your details and reach out within 24 hours.</p>
      <p style="color:#78716c; font-size:12px;">This is an automated confirmation. Please keep your Application No. for reference.</p>
    </div>
  `;

  return transporter.sendMail({
    from: `"Your IP Law Firm" <${emailFrom}>`,
    to: email,
    subject: `Application Received - ${appNo}`,
    html,
  });
}

module.exports = { sendAdminNotification, sendUserConfirmation, transporter, withTimeout };