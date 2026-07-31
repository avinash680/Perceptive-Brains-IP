const { sendAdminEmail, sendUserEmail } = require("../service/consultation.service");
const { sendAdminWhatsapp, sendUserWhatsapp } = require("../service/whatsapp.service");

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

    const results = await Promise.allSettled([
      sendAdminEmail(payload),
      sendUserEmail(payload),
      sendAdminWhatsapp(payload),
      sendUserWhatsapp(payload),
    ]);

    const failures = results
      .map((result, index) => {
        if (result.status === "rejected") {
          const errorMap = [
            "admin-email",
            "user-email",
            "admin-whatsapp",
            "user-whatsapp",
          ];
          return {
            error: errorMap[index],
            detail: result.reason?.message || String(result.reason),
          };
        }
        return null;
      })
      .filter(Boolean);

    const emailSucceeded = results[0].status === "fulfilled" || results[1].status === "fulfilled";

    if (failures.length && !emailSucceeded) {
      failures.forEach((f) => console.error(`[consultation] ${f.error} failed:`, f.detail));
      return res.status(502).json({
        success: false,
        error: "We received your request but could not send the notification emails. Please try again shortly.",
        details: failures,
      });
    }

    if (failures.length) {
      failures.forEach((f) => console.warn(`[consultation] ${f.error} failed:`, f.detail));
    }

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error("[consultation] unexpected error:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};