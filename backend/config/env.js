
require("dotenv").config();
 
module.exports = {
  port: process.env.PORT || 5000,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "*",
 
  admin: {
    email: process.env.ADMIN_EMAIL,
    whatsapp: process.env.ADMIN_WHATSAPP_NUMBER, // e.g. +911234567890
  },
 
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
  },
 
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM, // e.g. whatsapp:+14155238886
  },
};