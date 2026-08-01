const { sendAdminEmail, sendUserEmail } = require("../service/consultation.service");

function generateAppNo() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IP-${year}-${rand}`;
}

function queueConsultationNotifications(payload) {
  Promise.resolve()
    .then(() => Promise.all([sendAdminEmail(payload), sendUserEmail(payload)]))
    .then((results) => {
      console.info("[consultation] notification emails sent:", {
        appNo: payload.appNo,
        admin: results[0]?.messageId,
        user: results[1]?.messageId,
      });
    })
    .catch((err) => {
      console.error("[consultation] queued notification failed:", err);
    });
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

    queueConsultationNotifications(payload);

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error("[consultation] notification error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to send email notifications. Please check SMTP settings.",
    });
  }
};