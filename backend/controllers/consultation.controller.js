const { sendAdminNotification, sendUserConfirmation } = require("../service/email.service");
const { sendAdminWhatsAppAlert, sendUserWhatsAppConfirmation } = require("../service/whatsapp.service");
const { generateAppNo } = require("../service/app.no.service");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * CONTROLLER
 * ----------
 * This is where the actual "what should happen" logic lives for each route.
 * It does NOT know how emails/WhatsApp messages are actually sent - it just
 * calls the services that know how, and decides what to send back to the
 * client. Keeping this separate from routes.js means routes.js stays a
 * simple, readable list of "this URL -> this function".
 */

// GET /api/consultation/warmup
function warmup(req, res) {
  res.status(200).json({ status: "warm" });
}

// POST /api/consultation
async function submitConsultation(req, res) {
  try {
    const { name, email, phone, service, message } = req.body || {};

    // 1. Validate input
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: "Full name is required." });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "A valid email address is required." });
    }

    // 2. Generate the application number (no database needed)
    const appNo = generateAppNo();
    const submittedAt = new Date();

    // 3. Send email to admin + user at the same time
    const [adminEmailResult, userEmailResult] = await Promise.allSettled([
      sendAdminNotification({ name, email, phone, service, message, appNo, submittedAt }),
      sendUserConfirmation({ name, email, service, appNo, submittedAt }),
    ]);

    // Admin not being notified is the critical failure - stop here.
    if (adminEmailResult.status === "rejected") {
      console.error("Admin email failed:", adminEmailResult.reason);
      return res.status(502).json({
        success: false,
        error: "We could not process your application right now. Please try again shortly.",
      });
    }

    if (userEmailResult.status === "rejected") {
      // Admin already has it, so the application is still valid - just log it.
      console.error("User confirmation email failed:", userEmailResult.reason);
    }

    // 4. Send WhatsApp to admin + user (optional - only runs if configured)
    const [adminWaResult, userWaResult] = await Promise.allSettled([
      sendAdminWhatsAppAlert({ name, phone, service, appNo }),
      sendUserWhatsAppConfirmation({ name, phone, appNo }),
    ]);

    if (adminWaResult.status === "rejected") {
      console.error("Admin WhatsApp alert failed:", adminWaResult.reason?.response?.data || adminWaResult.reason);
    }
    if (userWaResult.status === "rejected") {
      console.error("User WhatsApp confirmation failed:", userWaResult.reason?.response?.data || userWaResult.reason);
    }

    // 5. Respond to the client
    return res.status(200).json({
      success: true,
      appNo,
      userEmailSent: userEmailResult.status === "fulfilled",
      adminWhatsAppSent: adminWaResult.status === "fulfilled" && adminWaResult.value !== null,
      userWhatsAppSent: userWaResult.status === "fulfilled" && userWaResult.value !== null,
    });
  } catch (err) {
    console.error("Consultation submission error:", err);
    return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
}

module.exports = { warmup, submitConsultation };