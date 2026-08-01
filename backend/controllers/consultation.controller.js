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

    // Send notification emails in the background so the HTTP response
    // is not blocked by slow SMTP delivery or retries.
    Promise.all([sendAdminEmail(payload), sendUserEmail(payload)])
      .then((results) => {
        console.info("[consultation] notification emails sent:", {
          appNo,
          admin: results[0]?.messageId,
          user: results[1]?.messageId,
        });
      })
      .catch((emailErr) => {
        console.error("[consultation] delayed email send failed:", emailErr);
      });

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error("[consultation] notification error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to send email notifications. Please check SMTP settings.",
    });
  }
};