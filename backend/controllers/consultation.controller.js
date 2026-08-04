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

    let adminEmailSent = false;
    let userEmailSent = false;
    let adminEmailError = null;
    let userEmailError = null;

    // These independent network calls used to run one after another, easily
    // exceeding the browser request timeout when SMTP is slow.
    const [adminResult, userResult] = await Promise.allSettled([
      sendAdminNotification(payload),
      sendUserConfirmation(payload),
    ]);

    if (adminResult.status === "fulfilled") {
      adminEmailSent = true;
    } else {
      adminEmailError = adminResult.reason?.message || String(adminResult.reason);
      console.error("Admin email failed:", adminEmailError);
    }

    if (userResult.status === "fulfilled") {
      userEmailSent = true;
    } else {
      userEmailError = userResult.reason?.message || String(userResult.reason);
      console.error("User confirmation email failed:", userEmailError);
    }

    return res.status(200).json({
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
    return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
}

module.exports = { warmup, submitConsultation };
