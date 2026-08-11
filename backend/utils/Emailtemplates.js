const { escapeHtml } = require('./escapeHtml');

function adminNotificationTemplate({ name, email, phone, service, message, appNo }) {
  return {
    subject: `New Consultation Request [${appNo}]: ${service || 'General Inquiry'}`,
    html: `
      <h2>New Consultation Request Received</h2>
      <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;">
        <tr><td><strong>Application No.</strong></td><td>${escapeHtml(appNo)}</td></tr>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || '-')}</td></tr>
        <tr><td><strong>Service</strong></td><td>${escapeHtml(service || '-')}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message || '-')}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${new Date().toLocaleString()}</td></tr>
      </table>
    `,
  };
}

function userConfirmationTemplate({ name, service, appNo }) {
  return {
    subject: `Application Received [${appNo}] — ${service || 'Consultation'}`,
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for reaching out${service ? ` regarding <strong>${escapeHtml(service)}</strong>` : ''}.
      Your application has been received and assigned the reference number
      <strong>${escapeHtml(appNo)}</strong>.</p>
      <p>A registered attorney will review your details and reach out within 24 hours.</p>
      <p>If your query is urgent, feel free to reply directly to this email.</p>
      <br/>
      <p>Best regards,<br/>${escapeHtml(process.env.MAIL_FROM_NAME || 'Consultation Team')}</p>
    `,
  };
}

module.exports = { adminNotificationTemplate, userConfirmationTemplate };