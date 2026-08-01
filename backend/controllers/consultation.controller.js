const {
  sendConsultationNotifications,
  getSmtpStatus,
  verifySmtpConnection,
} = require("../service/consultation.service");

function generateAppNo() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IP-${year}-${rand}`;
}

function queueConsultationNotifications(payload) {
  sendConsultationNotifications(payload).catch((err) => {
    console.error("[consultation] queued notification failed:", err.message || err);
  });
}

exports.getEmailHealth = async (_req, res) => {
  const status = getSmtpStatus();

  if (!status.configured) {
    return res.status(503).json({
      success: false,
      ...status,
      message: "SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS on Render.",
    });
  }

  const verification = await verifySmtpConnection();
  return res.status(verification.ok ? 200 : 503).json({
    success: verification.ok,
    ...status,
    verified: verification.ok,
    error: verification.error || null,
  });
};

exports.submitConsultation = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim();

    if (!trimmedName || !trimmedEmail) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required.",
      });
    }

    const smtpStatus = getSmtpStatus();
    if (!smtpStatus.configured) {
      console.error("[consultation] submission received but SMTP is not configured:", smtpStatus.missing);
      return res.status(503).json({
        success: false,
        error: "Email service is not configured on the server. Please contact support.",
      });
    }

    const appNo = generateAppNo();
    const payload = {
      appNo,
      name: trimmedName,
      email: trimmedEmail,
      phone: String(phone || "").trim(),
      service: String(service || "").trim(),
      message: String(message || "").trim(),
    };

    queueConsultationNotifications(payload);

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error("[consultation] notification error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process consultation request.",
    });
  }
};
