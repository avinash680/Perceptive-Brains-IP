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

    res.status(200).json({ success: true, appNo });

    Promise.allSettled([
      sendAdminEmail(payload),
      sendUserEmail(payload),
    ])
      .then((results) => {
        const failures = results
          .map((result, index) => {
            if (result.status === "rejected") {
              const errorMap = [
                "admin-email",
                "user-email",
              ];
              return {
                error: errorMap[index],
                detail: result.reason?.message || String(result.reason),
              };
            }
            return null;
          })
          .filter(Boolean);

        failures.forEach((f) => console.warn(`[consultation] ${f.error} failed:`, f.detail));
      })
      .catch((err) => {
        console.error("[consultation] notification background error:", err);
      });

    return;
  } catch (err) {
    console.error("[consultation] unexpected error:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
};