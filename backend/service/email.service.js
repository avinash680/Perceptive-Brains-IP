const { Resend } = require("resend");

function getResendApiKey() {
  return process.env.RESEND_API_KEY || "";
}

function getResendClient() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    throw new Error("Resend API key is not configured. Set RESEND_API_KEY in your environment.");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  const fromName = process.env.MAIL_FROM_NAME || "Perceptive Brains IP";
  const fromEmail =
    process.env.MAIL_FROM_ADDRESS ||
    process.env.MAIL_FROM ||
    process.env.SMTP_USER ||
    process.env.GMAIL_USER ||
    "onboarding@resend.dev";

  if (fromEmail.includes("<")) {
    return fromEmail;
  }
  return `"${fromName}" <${fromEmail}>`;
}

function verifyMailConnection() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY missing. Email sending is disabled.");
    return { ok: false, error: "RESEND_API_KEY missing" };
  }
  console.info("[email] Resend configured successfully.");
  return { ok: true };
}

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

async function sendAdminNotification({ name, email, phone, service, message, appNo, submittedAt }) {
  const resend = getResendClient();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER;
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured.");
  }
  const fromAddress = getFromAddress();

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

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [adminEmail],
    replyTo: email,
    subject: `New Application ${appNo} - ${name}`,
    html,
  });

  if (error) {
    console.error("[email] Resend error sending admin notification:", error);
    throw new Error(`Resend notification failed: ${error.message || JSON.stringify(error)}`);
  }

  console.info("[email] Admin notification sent:", data);
  return data;
}

async function sendUserConfirmation({ name, email, service, appNo, submittedAt }) {
  const resend = getResendClient();
  const recipient = String(email || "").trim();
  if (!recipient) {
    throw new Error("Recipient email is required for user confirmation.");
  }

  const fromAddress = getFromAddress();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER;

  const text = [
    `Dear ${name},`,
    "",
    "Thank you for reaching out. Your consultation request has been received.",
    "",
    `Application No: ${appNo}`,
    `Service: ${service || "-"}`,
    `Submitted: ${formatDate(submittedAt)}`,
    "",
    "A registered attorney will review your details and reach out within 24 hours.",
    "",
    "Perceptive Brains IP",
  ].join("\n");

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

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [recipient],
    replyTo: adminEmail || undefined,
    subject: `Application Received - ${appNo}`,
    text,
    html,
  });

  if (error) {
    console.error("[email] Resend error sending user confirmation:", error);
    throw new Error(`Resend confirmation failed: ${error.message || JSON.stringify(error)}`);
  }

  console.info("[email] User confirmation sent:", data);
  return data;
}

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  verifyMailConnection,
  getResendClient,
  getFromAddress,
};
