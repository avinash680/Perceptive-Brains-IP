require("dotenv").config();

const {
  verifyMailConnection,
  sendAdminNotification,
  sendUserConfirmation,
} = require("../service/email.service");

async function main() {
  const verification = await verifyMailConnection();
  if (!verification.ok) {
    process.exitCode = 1;
    return;
  }

  const testEmail = process.argv[2] || process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
  if (!testEmail) {
    console.error("Pass a test email: node scripts/test-smtp.js you@gmail.com");
    process.exitCode = 1;
    return;
  }

  const submittedAt = new Date();
  const payload = {
    appNo: "IP-TEST-0001",
    name: "SMTP Test User",
    email: testEmail,
    phone: "+91 00000 00000",
    service: "Test",
    message: "This is a test email from the consultation form backend.",
    submittedAt,
  };

  await sendAdminNotification(payload);
  console.log("Admin notification sent.");

  await sendUserConfirmation(payload);
  console.log("User confirmation sent to:", testEmail);
}

main().catch((err) => {
  console.error("SMTP test failed:", err.message || err);
  process.exitCode = 1;
});
