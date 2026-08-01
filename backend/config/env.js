const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

function trim(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function getNumericEnv(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Gmail app passwords are often copied with spaces — remove them. */
function normalizeSmtpPass(value) {
  return trim(value).replace(/\s+/g, "");
}

const smtpUser = trim(process.env.SMTP_USER);
const smtpFrom = trim(process.env.SMTP_FROM) || smtpUser;

module.exports = {
  port: getNumericEnv("PORT", 8080),
  frontendOrigin: process.env.FRONTEND_ORIGIN || "*",

  admin: {
    email: trim(process.env.ADMIN_EMAIL) || smtpFrom,
    whatsapp: trim(process.env.ADMIN_WHATSAPP_NUMBER),
  },

  smtp: {
    host: trim(process.env.SMTP_HOST),
    port: getNumericEnv("SMTP_PORT", 587),
    user: smtpUser,
    pass: normalizeSmtpPass(process.env.SMTP_PASS),
    from: smtpFrom,
  },

  twilio: {
    accountSid: trim(process.env.TWILIO_ACCOUNT_SID),
    authToken: trim(process.env.TWILIO_AUTH_TOKEN),
    whatsappFrom: trim(process.env.TWILIO_WHATSAPP_FROM),
  },
};
