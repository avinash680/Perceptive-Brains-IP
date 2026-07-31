const twilio = require("twilio");
const config = require("../config/env");
const { sendUserEmail } = require("./consultation.service");

function getClient() {
  if (!config.twilio.accountSid || !config.twilio.authToken) {
    throw new Error("Twilio credentials are incomplete.");
  }

  return twilio(config.twilio.accountSid, config.twilio.authToken);
}

function toWhatsAppAddress(rawNumber) {
  if (!rawNumber) return null;
  return rawNumber.startsWith("whatsapp:") ? rawNumber : `whatsapp:${rawNumber}`;
}

/**
 * Notify the admin/firm via WhatsApp about a new consultation request.
 */
async function sendAdminWhatsapp({ appNo, name, email, phone, service, message }) {
  const to = toWhatsAppAddress(config.admin.whatsapp);
  if (!to) return null;

  const client = getClient();
  const body =
    `📥 *New Consultation Request*\n` +
    `App No: ${appNo}\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "-"}\n` +
    `Service: ${service || "-"}\n` +
    `Message: ${message || "-"}`;

  return client.messages.create({
    from: config.twilio.whatsappFrom,
    to,
    body,
  });
}

/**
 * Confirmation WhatsApp message sent back to the applicant (only if they gave a phone number).
 */
async function sendUserWhatsapp({ appNo, name, phone }) {
  const to = toWhatsAppAddress(phone);
  if (!to) return null; // no phone provided, skip silently

  const client = getClient();
  const body =
    `Hi ${name}, thanks for your application! 🎉\n` +
    `Your application number is *${appNo}*.\n` +
    `Our team will contact you within 24 hours.`;

  return client.messages.create({
    from: config.twilio.whatsappFrom,
    to,
    body,
  });
}

async function sendUserNotification({ appNo, name, email, phone }) {
  const failures = [];
  let sentAny = false;

  if (email) {
    try {
      await sendUserEmail({ appNo, name, email });
      sentAny = true;
    } catch (err) {
      failures.push({ type: "email", detail: err.message || String(err) });
    }
  }

  if (phone) {
    try {
      await sendUserWhatsapp({ appNo, name, phone });
      sentAny = true;
    } catch (err) {
      failures.push({ type: "whatsapp", detail: err.message || String(err) });
    }
  }

  if (failures.length) {
    throw new Error(JSON.stringify(failures));
  }

  return sentAny;
}

module.exports = { sendAdminWhatsapp, sendUserWhatsapp, sendUserNotification };

