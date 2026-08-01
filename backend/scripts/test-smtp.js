require("../config/env");

const {
  verifySmtpConnection,
  sendConsultationNotifications,
  getSmtpStatus,
} = require("../service/consultation.service");

async function main() {
  console.log("SMTP status:", getSmtpStatus());

  const verification = await verifySmtpConnection();
  if (!verification.ok) {
    process.exitCode = 1;
    return;
  }

  const testEmail = process.argv[2] || process.env.ADMIN_EMAIL;
  if (!testEmail) {
    console.error("Pass a test email: node scripts/test-smtp.js you@gmail.com");
    process.exitCode = 1;
    return;
  }

  await sendConsultationNotifications({
    appNo: "IP-TEST-0001",
    name: "SMTP Test User",
    email: testEmail,
    phone: "+91 00000 00000",
    service: "Test",
    message: "This is a test email from the consultation form backend.",
  });

  console.log("Test emails sent successfully to admin and", testEmail);
}

main().catch((err) => {
  console.error("SMTP test failed:", err.message || err);
  process.exitCode = 1;
});
