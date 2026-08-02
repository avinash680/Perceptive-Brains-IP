const axios = require("axios");

const GRAPH_VERSION = "v20.0";
const GRAPH_URL = `https://graph.facebook.com/${GRAPH_VERSION}`;

/**
 * WhatsApp Business "conversations that a business starts" (i.e. notifying
 * someone who hasn't messaged you first) MUST use a pre-approved message
 * template - free-form text only works within a 24h window after the
 * customer messages you. So both functions below send template messages.
 *
 * Create the templates once in Meta Business Manager -> WhatsApp Manager ->
 * Message Templates (see README for the exact body text to submit).
 */
async function sendWhatsAppTemplate(to, templateName, languageCode, bodyParams = []) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !token) {
    // WhatsApp isn't configured - treat as a no-op rather than an error,
    // since it's an optional channel on top of email.
    return null;
  }

  const url = `${GRAPH_URL}/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to, // E.164 format without "+", e.g. 919876543210
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode || "en_US" },
      components: bodyParams.length
        ? [
            {
              type: "body",
              parameters: bodyParams.map((text) => ({ type: "text", text: String(text) })),
            },
          ]
        : [],
    },
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

function normalizeNumber(raw) {
  if (!raw) return null;
  // Strip spaces, dashes, parens and a leading "+" - Meta's API wants
  // digits only (country code + number), e.g. "919876543210".
  return String(raw).replace(/[^\d]/g, "");
}

async function sendAdminWhatsAppAlert({ name, phone, service, appNo }) {
  const adminNumber = normalizeNumber(process.env.ADMIN_WHATSAPP_NUMBER);
  if (!adminNumber) return null;

  const templateName = process.env.WHATSAPP_ADMIN_TEMPLATE || "consultation_admin_alert";
  return sendWhatsAppTemplate(adminNumber, templateName, "en_US", [
    appNo,
    name,
    phone || "-",
    service || "-",
  ]);
}

async function sendUserWhatsAppConfirmation({ name, phone, appNo }) {
  const userNumber = normalizeNumber(phone);
  if (!userNumber) return null; // user didn't provide a phone number

  const templateName = process.env.WHATSAPP_USER_TEMPLATE || "consultation_user_confirmation";
  return sendWhatsAppTemplate(userNumber, templateName, "en_US", [name, appNo]);
}

module.exports = { sendAdminWhatsAppAlert, sendUserWhatsAppConfirmation };