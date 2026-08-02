const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password, NOT your normal password
  },
});

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date) =>
  date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

async function sendAdminNotification({ name, email, phone, service, message, appNo, submittedAt }) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

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
    from: `"IP Consultation Form" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Application ${appNo} - ${name}`,
    html,
  });
}

async function sendUserConfirmation({ name, email, service, appNo, submittedAt }) {
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
    from: `"Your IP Law Firm" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Application Received - ${appNo}`,
    html,
  });
}

module.exports = { sendAdminNotification, sendUserConfirmation, transporter };