require("dotenv").config();

const {
  verifyMailConnection,
  sendAdminNotification,
  sendUserConfirmation,
} = require("../service/email.service");

async function main() {
  const verification = verifyMailConnection();
  if (!verification.ok) {
    console.error("Resend configuration check failed:", verification.error);
    process.exitCode = 1;
    return;
  }

  const testEmail = process.argv[2] || process.env.ADMIN_EMAIL;
  if (!testEmail) {
    console.error("Pass a test email: node scripts/test-email.js you@example.com");
    process.exitCode = 1;
    return;
  }

  const submittedAt = new Date();
  const payload = {
    appNo: "IP-TEST-0001",
    name: "Resend Test User",
    email: testEmail,
    phone: "+91 00000 00000",
    service: "Test Service",
    message: "This is a test email sent via Resend API.",
    submittedAt,
  };

  await sendAdminNotification(payload);
  console.log("Admin notification sent via Resend.");

  await sendUserConfirmation(payload);
  console.log("User confirmation sent to:", testEmail);
}

main().catch((err) => {
  console.error("Resend email test failed:", err.message || err);
  process.exitCode = 1;
});
