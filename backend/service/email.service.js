const transporter = require('../config/mailer');
const { adminNotificationTemplate, userConfirmationTemplate } = require('../utils/emailTemplates');

function getAdminEmails() {
  const list = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  return list;
}

function getFromField() {
  return `"${process.env.MAIL_FROM_NAME || 'Website'}" <${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`;
}

/**
 * Sends the admin notification email and the user confirmation email
 * concurrently. A failure on one does not throw — both outcomes are
 * reported back so the caller can decide how to respond/log.
 *
 * @returns {Promise<{ adminSent: boolean, userSent: boolean, errors: Error[] }>}
 */
async function sendConsultationEmails({ name, email, phone, service, message, appNo }) {
  const adminEmails = getAdminEmails();
  const fromField = getFromField();

  if (!adminEmails.length) {
    console.warn('ADMIN_EMAILS is not configured; admin notification will be skipped.');
  }

  const adminContent = adminNotificationTemplate({ name, email, phone, service, message, appNo });
  const userContent = userConfirmationTemplate({ name, service, appNo });

  const jobs = [];
  const jobLabels = [];

  if (adminEmails.length) {
    jobs.push(
      transporter.sendMail({
        from: fromField,
        to: adminEmails.join(','),
        replyTo: email,
        subject: adminContent.subject,
        html: adminContent.html,
      })
    );
    jobLabels.push('admin');
  }

  jobs.push(
    transporter.sendMail({
      from: fromField,
      to: email,
      subject: userContent.subject,
      html: userContent.html,
    })
  );
  jobLabels.push('user');

  const results = await Promise.allSettled(jobs);

  const outcome = { adminSent: !adminEmails.length ? false : undefined, userSent: undefined, errors: [] };

  results.forEach((result, idx) => {
    const label = jobLabels[idx];
    const sent = result.status === 'fulfilled';
    if (label === 'admin') outcome.adminSent = sent;
    if (label === 'user') outcome.userSent = sent;
    if (!sent) {
      console.error(`Failed to send ${label} email:`, result.reason?.message || result.reason);
      outcome.errors.push(result.reason);
    }
  });

  // Log detailed send results for debugging (accepted/rejected recipients)
  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      const info = result.value;
      const label = jobLabels[idx];
      try {
        console.log(`Email (${label}) sent. accepted=${JSON.stringify(info.accepted || info.envelope?.to || [])} rejected=${JSON.stringify(info.rejected || [])} response=${info.response || info}`);
      } catch (e) {
        // ignore logging errors
      }
    }
  });

  return outcome;
}

module.exports = { sendConsultationEmails };