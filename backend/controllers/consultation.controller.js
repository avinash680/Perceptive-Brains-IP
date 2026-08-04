const { sendAdminNotification, sendUserConfirmation } = require("../service/email.service");
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

    // ─── Respond immediately so the browser never hits a timeout ─────────────
    // Emails are sent fire-and-forget AFTER the response is flushed.
    // This means SMTP latency (which can take 10-20s on a cold Render instance)
    // never blocks the HTTP request.
    res.status(200).json({
      success: true,
      appNo,
      userEmailSent: true,   // optimistic – emails will arrive shortly
      adminEmailSent: true,
    });

    // ─── Send both emails in the background ───────────────────────────────────
    Promise.allSettled([
      sendAdminNotification(payload),
      sendUserConfirmation(payload),
    ]).then(([adminResult, userResult]) => {
      if (adminResult.status === "rejected") {
        console.error("[email] Admin notification failed:", adminResult.reason?.message || adminResult.reason);
      } else {
        console.info("[email] Admin notification sent for", appNo);
      }

      if (userResult.status === "rejected") {
        console.error("[email] User confirmation failed:", userResult.reason?.message || userResult.reason);
      } else {
        console.info("[email] User confirmation sent for", appNo);
      }
    });

  } catch (err) {
    console.error("Consultation submission error:", err);
    // Only reached if validation or generateAppNo() throws before we respond
    if (!res.headersSent) {
      return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
    }
  }
}

module.exports = { warmup, submitConsultation };
