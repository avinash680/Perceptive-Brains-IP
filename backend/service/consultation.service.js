const nodemailer = require("nodemailer");
const config = require("../config/env");

function createTransporter() {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.pass || !config.smtp.from) {
    throw new Error("SMTP configuration is incomplete.");
  }

  const port = Number.isFinite(config.smtp.port) ? config.smtp.port : 587;

  return nodemailer.createTransport({
    host: config.smtp.host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
}

/**
 * Notify the admin/firm that a new consultation request came in.
 */
async function sendAdminEmail({ appNo, name, email, phone, service, message }) {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: config.smtp.from,
    to: config.admin.email,
    subject: `New Consultation Request — ${appNo}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1c1c1c;">
        <h2 style="margin-bottom: 4px;">New Consultation Application</h2>
        <p style="color:#b45309; font-family: monospace;">Application No: ${appNo}</p>
        <table cellpadding="6" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || "-"}</td></tr>
          <tr><td><strong>Service</strong></td><td>${service || "-"}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message || "-"}</td></tr>
        </table>
      </div>
    `,
  });
}

/**
 * Confirmation email sent back to the applicant.
 */
async function sendUserEmail({ appNo, name, email }) {
  const transporter = createTransporter();

  const textBody = [
    `Hi ${name},`,
    "",
    `Thanks for reaching out. Your application number is ${appNo}.`,
    "A registered attorney will review your details and get back to you within 24 hours.",
    "",
    "— Perceptive Brains Team",
  ].join("\n");

  const fromEmail = config.smtp.from || config.smtp.user;

  return transporter.sendMail({
    from: `Perceptive Brains IP <${fromEmail}>`,
    to: email,
    replyTo: fromEmail,
    subject: `We've received your application — ${appNo}`,
    text: textBody,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1c1c1c;">
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. Your application number is <strong>${appNo}</strong>.</p>
        <p>A registered attorney will review your details and get back to you within 24 hours.</p>
        <p style="margin-top:24px; color:#666;">— Perceptive Brains Team</p>
      </div>
    `,
  });
}

module.exports = { sendAdminEmail, sendUserEmail };