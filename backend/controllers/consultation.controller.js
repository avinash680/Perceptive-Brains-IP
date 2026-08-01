const { sendAdminEmail, sendUserEmail } = require("../service/consultation.service");

function generateAppNo() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IP-${year}-${rand}`;
}

exports.submitConsultation = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required.",
      });
    }

    const appNo = generateAppNo();
    const payload = { appNo, name, email, phone, service, message };

    // Await email delivery so that any SMTP configuration or connection error
    // is caught and returned to the client rather than failing silently in the background.
    await Promise.all([
      sendAdminEmail(payload),
      sendUserEmail(payload),
    ]);

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error("[consultation] notification error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to send email notifications. Please check SMTP settings.",
    });
  }
};