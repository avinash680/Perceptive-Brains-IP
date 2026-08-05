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

    const [adminResult, userResult] = await Promise.allSettled([
      sendAdminNotification(payload),
      sendUserConfirmation(payload),
    ]);

    const adminEmailSent = adminResult.status === "fulfilled";
    const userEmailSent = userResult.status === "fulfilled";
    const adminEmailError = adminResult.status === "rejected" ? String(adminResult.reason?.message || adminResult.reason) : null;
    const userEmailError = userResult.status === "rejected" ? String(userResult.reason?.message || userResult.reason) : null;

    if (adminEmailSent) {
      console.info("[email] Admin notification sent for", appNo);
    } else {
      console.error("[email] Admin notification failed:", adminEmailError);
    }

    if (userEmailSent) {
      console.info("[email] User confirmation sent for", appNo);
    } else {
      console.error("[email] User confirmation failed:", userEmailError);
    }

    res.status(200).json({
      success: true,
      appNo,
      adminEmailSent,
      userEmailSent,
      adminEmailError,
      userEmailError,
      notificationsPending: !adminEmailSent || !userEmailSent,
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
