const twilio = require("twilio");

function withTimeout(promiseFactory, timeoutMs, fallbackValue) {
  return new Promise((resolve) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(fallbackValue);
      }
    }, timeoutMs);

    Promise.resolve()
      .then(promiseFactory)
      .then((value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(value);
        }
      })
      .catch(() => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(fallbackValue);
        }
      });
  });
}

const WHATSAPP_SEND_TIMEOUT_MS = Number(process.env.WHATSAPP_SEND_TIMEOUT_MS || 8000);

function isConfigured() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_FROM
  );
}

function getClient() {
  if (!isConfigured()) {
    return null;
  }

  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

function toWhatsAppAddress(rawNumber) {
  if (!rawNumber) return null;
  return rawNumber.startsWith("whatsapp:") ? rawNumber : `whatsapp:${rawNumber}`;
}

async function sendAdminWhatsAppAlert({ name, phone, service, appNo }) {
  const client = getClient();
  const adminNumber = toWhatsAppAddress(process.env.ADMIN_WHATSAPP_NUMBER);

  if (!client || !adminNumber) {
    return null;
  }

  const body =
    `New Consultation Request\n` +
    `App No: ${appNo}\n` +
    `Name: ${name}\n` +
    `Phone: ${phone || "-"}\n` +
    `Service: ${service || "-"}`;

  const result = await withTimeout(
    () => client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: adminNumber,
      body,
    }),
    WHATSAPP_SEND_TIMEOUT_MS,
    null
  );

  if (!result) {
    throw new Error(`WhatsApp delivery timed out after ${WHATSAPP_SEND_TIMEOUT_MS}ms.`);
  }

  return result;
}

async function sendUserWhatsAppConfirmation({ name, phone, appNo }) {
  const client = getClient();
  const userNumber = toWhatsAppAddress(phone);

  if (!client || !userNumber) {
    return null;
  }

  const body =
    `Hi ${name}, thanks for your application.\n` +
    `Your application number is ${appNo}.\n` +
    `Our team will contact you within 24 hours.`;

  const result = await withTimeout(
    () => client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: userNumber,
      body,
    }),
    WHATSAPP_SEND_TIMEOUT_MS,
    null
  );

  if (!result) {
    throw new Error(`WhatsApp delivery timed out after ${WHATSAPP_SEND_TIMEOUT_MS}ms.`);
  }

  return result;
}

module.exports = {
  sendAdminWhatsAppAlert,
  sendUserWhatsAppConfirmation,
};
