const { sendAdminNotification, sendUserConfirmation } = require("../service/email.service");
const { sendAdminWhatsAppAlert, sendUserWhatsAppConfirmation } = require("../service/whatsapp.service");
const { generateAppNo } = require("../service/app.no.service");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function warmup(req, res) {
  res.status(200).json({ status: "warm" });
}

async function submitConsultation(req, res) {
  try {
    const { name, email, phone, service, message } = req.body || {};
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim();

    if (!trimmedName) {
      return res.status(400).json({ success: false, error: "Full name is required." });
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      return res.status(400).json({ success: false, error: "A valid email address is required." });
    }

    const appNo = generateAppNo();
    const submittedAt = new Date();
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: String(phone || "").trim(),
      service: String(service || "").trim(),
      message: String(message || "").trim(),
      appNo,
      submittedAt,
    };

    let adminEmailSent = false;
    let userEmailSent = false;

    try {
      await sendAdminNotification(payload);
      adminEmailSent = true;
    } catch (err) {
      console.error("Admin email failed:", err.message || err);
    }

    try {
      await sendUserConfirmation(payload);
      userEmailSent = true;
    } catch (err) {
      console.error("User confirmation email failed:", err.message || err);
    }

    const [adminWaResult, userWaResult] = await Promise.allSettled([
      sendAdminWhatsAppAlert({ name: payload.name, phone: payload.phone, service: payload.service, appNo }),
      sendUserWhatsAppConfirmation({ name: payload.name, phone: payload.phone, appNo }),
    ]);

    if (adminWaResult.status === "rejected") {
      console.error("Admin WhatsApp alert failed:", adminWaResult.reason?.message || adminWaResult.reason);
    }

    if (userWaResult.status === "rejected") {
      console.error("User WhatsApp confirmation failed:", userWaResult.reason?.message || userWaResult.reason);
    }

    return res.status(200).json({
      success: true,
      appNo,
      adminEmailSent,
      userEmailSent,
      adminWhatsAppSent: adminWaResult.status === "fulfilled" && adminWaResult.value !== null,
      userWhatsAppSent: userWaResult.status === "fulfilled" && userWaResult.value !== null,
    });
  } catch (err) {
    console.error("Consultation submission error:", err);
    return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
}

module.exports = { warmup, submitConsultation };
