const nodemailer = require("nodemailer");
const config = require("../config/env");

let sharedTransporter = null;

function isGmailHost(host) {
  return String(host || "").toLowerCase().includes("gmail");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function getMissingSmtpFields() {
  const missing = [];
  if (!config.smtp.host) missing.push("SMTP_HOST");
  if (!config.smtp.user) missing.push("SMTP_USER");
  if (!config.smtp.pass) missing.push("SMTP_PASS");
  if (!config.smtp.from) missing.push("SMTP_FROM");
  return missing;
}

function isSmtpConfigured() {
  return getMissingSmtpFields().length === 0;
}

function getSmtpStatus() {
  const missing = getMissingSmtpFields();
  return {
    configured: missing.length === 0,
    missing,
    host: config.smtp.host || null,
    port: config.smtp.port,
    user: config.smtp.user || null,
    from: config.smtp.from || null,
    adminEmail: config.admin.email || null,
    provider: isGmailHost(config.smtp.host) ? "gmail" : "smtp",
  };
}

function createTransporter() {
  if (!isSmtpConfigured()) {
    throw new Error(`SMTP configuration is incomplete. Missing: ${getMissingSmtpFields().join(", ")}`);
  }

  if (sharedTransporter) {
    return sharedTransporter;
  }

  const auth = {
    user: config.smtp.user,
    pass: config.smtp.pass,
  };

  if (isGmailHost(config.smtp.host)) {
    sharedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth,
    });
    return sharedTransporter;
  }

  const port = Number.isFinite(config.smtp.port) ? config.smtp.port : 587;
  const secure = port === 465;

  sharedTransporter = nodemailer.createTransport({
    host: config.smtp.host,
    port,
    secure,
    requireTLS: !secure,
    auth,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });

  return sharedTransporter;
}

async function verifySmtpConnection() {
  const status = getSmtpStatus();
  if (!status.configured) {
    console.error("[consultation] SMTP NOT configured. Missing env vars:", status.missing.join(", "));
    console.error("[consultation] Emails will NOT be sent until SMTP_HOST, SMTP_USER, SMTP_PASS are set on Render.");
    return { ok: false, error: `Missing: ${status.missing.join(", ")}` };
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.info("[consultation] SMTP connection verified:", {
      host: status.host,
      user: status.user,
      from: status.from,
      adminEmail: status.adminEmail,
      provider: status.provider,
    });
    return { ok: true };
  } catch (err) {
    console.error("[consultation] SMTP verification failed:", err.message || err);
    if (isGmailHost(config.smtp.host)) {
      console.error(
        "[consultation] Gmail tip: use an App Password (not your login password). " +
          "Google Account -> Security -> 2-Step Verification -> App passwords."
      );
      console.error("[consultation] Gmail tip: SMTP_USER and SMTP_FROM must be the same Gmail address.");
    }
    return { ok: false, error: err.message || String(err) };
  }
}

function logSendResult(label, info) {
  console.info(`[consultation] ${label} email result:`, {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });

  if (info.rejected?.length) {
    throw new Error(`${label} email rejected by SMTP server: ${info.rejected.join(", ")}`);
  }

  if (!info.accepted?.length) {
    throw new Error(`${label} email was not accepted by SMTP server.`);
  }
}

async function sendAdminEmail({ appNo, name, email, phone, service, message }) {
  const transporter = createTransporter();
  const fromEmail = config.smtp.from;
  const adminEmail = config.admin.email || fromEmail;

  if (!isValidEmail(adminEmail)) {
    throw new Error(`Invalid admin email address: ${adminEmail || "(empty)"}`);
  }

  const info = await transporter.sendMail({
    from: `"Perceptive Brains IP" <${fromEmail}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Consultation Request - ${appNo}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1c1c1c;">
        <h2 style="margin-bottom: 4px;">New Consultation Application</h2>
        <p style="color:#b45309; font-family: monospace;">Application No: ${escapeHtml(appNo)}</p>
        <table cellpadding="6" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "-")}</td></tr>
          <tr><td><strong>Service</strong></td><td>${escapeHtml(service || "-")}</td></tr>
          <tr><td><strong>Message</strong></td><td>${escapeHtml(message || "-")}</td></tr>
        </table>
      </div>
    `,
  });

  logSendResult("admin", info);
  return info;
}

async function sendUserEmail({ appNo, name, email }) {
  const transporter = createTransporter();
  const fromEmail = config.smtp.from;
  const recipient = String(email || "").trim();

  if (!isValidEmail(recipient)) {
    throw new Error(`Invalid user email address: ${recipient || "(empty)"}`);
  }

  const textBody = [
    `Hi ${name},`,
    "",
    `Thanks for reaching out. Your application number is ${appNo}.`,
    "A registered attorney will review your details and get back to you within 24 hours.",
    "",
    "- Perceptive Brains Team",
  ].join("\n");

  const info = await transporter.sendMail({
    from: `"Perceptive Brains IP" <${fromEmail}>`,
    to: recipient,
    replyTo: fromEmail,
    subject: `We received your application - ${appNo}`,
    text: textBody,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1c1c1c;">
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out. Your application number is <strong>${escapeHtml(appNo)}</strong>.</p>
        <p>A registered attorney will review your details and get back to you within 24 hours.</p>
        <p style="margin-top:24px; color:#666;">- Perceptive Brains Team</p>
      </div>
    `,
  });

  logSendResult("user", info);
  return info;
}

async function sendConsultationNotifications(payload) {
  if (!isSmtpConfigured()) {
    throw new Error(`SMTP not configured. Missing: ${getMissingSmtpFields().join(", ")}`);
  }

  const results = await Promise.allSettled([
    sendAdminEmail(payload),
    sendUserEmail(payload),
  ]);

  const summary = {
    admin: results[0].status === "fulfilled" ? "sent" : "failed",
    user: results[1].status === "fulfilled" ? "sent" : "failed",
    errors: [],
  };

  if (results[0].status === "rejected") {
    const reason = results[0].reason?.message || String(results[0].reason);
    summary.errors.push({ target: "admin", error: reason });
    console.error("[consultation] admin email failed:", reason);
  }

  if (results[1].status === "rejected") {
    const reason = results[1].reason?.message || String(results[1].reason);
    summary.errors.push({ target: "user", error: reason });
    console.error("[consultation] user email failed:", reason);
  }

  if (summary.errors.length) {
    console.error("[consultation] notification summary:", summary);
    throw new Error(summary.errors.map((entry) => `${entry.target}: ${entry.error}`).join(" | "));
  }

  console.info("[consultation] notification emails sent:", {
    appNo: payload.appNo,
    admin: results[0].value?.messageId,
    user: results[1].value?.messageId,
  });

  return summary;
}

module.exports = {
  sendAdminEmail,
  sendUserEmail,
  sendConsultationNotifications,
  verifySmtpConnection,
  getSmtpStatus,
  isSmtpConfigured,
};
