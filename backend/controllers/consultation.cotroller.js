const { sendAdminEmail, sendUserEmail } = require("../service/consulation.service");
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

    // Fire all four notifications in parallel. Each is wrapped so one
    // failure (e.g. WhatsApp not configured) doesn't block the others.
    const tasks = [
      sendAdminEmail(payload).catch((e) => ({ error: "admin-email", detail: e.message })),
      sendUserEmail(payload).catch((e) => ({ error: "user-email", detail: e.message })),
      sendAdminWhatsapp(payload).catch((e) => ({ error: "admin-whatsapp", detail: e.message })),
      sendUserWhatsapp(payload).catch((e) => ({ error: "user-whatsapp", detail: e.message })),
    ];

    const results = await Promise.all(tasks);
    const failures = results.filter((r) => r && r.error);

    if (failures.length) {
      failures.forEach((f) => console.error(`[consultation] ${f.error} failed:`, f.detail));
    }

    return res.status(200).json({
      success: true,
      appNo,
      // Lets the frontend optionally surface a "some notifications didn't send" note
      warnings: failures.map((f) => f.error),
    });
  } catch (err) {
    console.error("[consultation] unexpected error:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};