const nodemailer = require("nodemailer");

function normalizePass(value) {
  return String(value || "").trim().replace(/\s+/g, "");
}

function getMailAuth() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = normalizePass(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS);

  if (!user || !pass) {
    throw new Error(
      "SMTP is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD, or provide SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS in your environment."
    );
  }

  return { user, pass };
}

function buildTransportConfig() {
  const auth = getMailAuth();
  const host = process.env.SMTP_HOST || process.env.GMAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || process.env.GMAIL_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;
  const family = Number(process.env.SMTP_FAMILY || 4);

  return {
    host,
    port,
    secure,
    auth,
    pool: false,
    family,
  };
}

let transporter = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport(buildTransportConfig());

  return transporter;
}

function getFromAddress() {
  const auth = getMailAuth();
  const fromName = process.env.MAIL_FROM_NAME || "Perceptive Brains IP";
  const fromAddress = process.env.MAIL_FROM_ADDRESS || auth.user;
  return `"${fromName}" <${fromAddress}>`;
}

async function verifyMailConnection() {
  try {
    await getTransporter().verify();
    const { user } = getMailAuth();
    console.info("[email] Gmail SMTP verified for:", user);
    return { ok: true };
  } catch (err) {
    console.error("[email] Gmail SMTP verification failed:", err.message || err);
    return { ok: false, error: err.message || String(err) };
  }
}

function withTimeout(promiseFactory, timeoutMs) {
  return new Promise((resolve, reject) => {
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      reject(new Error(`Email delivery timed out after ${timeoutMs}ms.`));
    }, timeoutMs);

    Promise.resolve()
      .then(promiseFactory)
      .then((value) => {
        if (!timedOut) {
          clearTimeout(timer);
          resolve(value);
        }
      })
      .catch((error) => {
        if (!timedOut) {
          clearTimeout(timer);
          reject(error);
        }
      });
  });
}

const EMAIL_SEND_TIMEOUT_MS = Number(process.env.EMAIL_SEND_TIMEOUT_MS || 20000);

async function sendMailWithTimeout(message, timeoutMs = EMAIL_SEND_TIMEOUT_MS) {
  const info = await withTimeout(() => getTransporter().sendMail(message), timeoutMs);
  return info;
}

async function sendMailWithRetry(message, attempts = 2) {
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await sendMailWithTimeout(message);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError;
}

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date) =>
  date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

function logMailResult(label, info) {
  console.info(`[email] ${label} result:`, {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  });

  if (info.rejected?.length) {
    throw new Error(`${label} rejected by Gmail: ${info.rejected.join(", ")}`);
  }

  if (!info.accepted?.length) {
    throw new Error(`${label} was not accepted by Gmail.`);
  }
}

async function sendAdminNotification({ name, email, phone, service, message, appNo, submittedAt }) {
  const { user } = getMailAuth();
  const adminEmail = process.env.ADMIN_EMAIL || user;
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

  const info = await sendMailWithTimeout({
    from: fromAddress,
    to: adminEmail,
    replyTo: email,
    subject: `New Application ${appNo} - ${name}`,
    html,
  });

  logMailResult("admin notification", info);
  return info;
}

async function sendUserConfirmation({ name, email, service, appNo, submittedAt }) {
  const { user } = getMailAuth();
  const recipient = String(email || "").trim();
  const adminEmail = process.env.ADMIN_EMAIL || user;
  const ccRecipient = adminEmail && adminEmail !== recipient ? adminEmail : undefined;
  const fromAddress = getFromAddress();

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

  const baseMessage = {
    from: fromAddress,
    replyTo: user,
    subject: `Application Received - ${appNo}`,
    text,
    html,
  };

  let info;

  try {
    const message = {
      ...baseMessage,
      to: recipient,
    };
    if (ccRecipient) {
      message.cc = ccRecipient;
    }

    info = await sendMailWithRetry(message);
  } catch (error) {
    if (ccRecipient) {
      console.warn("User confirmation failed for primary recipient, retrying with admin fallback:", error.message || error);
      info = await sendMailWithRetry({
        ...baseMessage,
        to: ccRecipient,
      });
    } else {
      throw error;
    }
  }

  logMailResult("user confirmation", info);
  return info;
}

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  verifyMailConnection,
  withTimeout,
  getTransporter,
  buildTransportConfig,
  getMailAuth,
  getFromAddress,
};
