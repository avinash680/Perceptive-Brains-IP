const { validateConsultation } = require('../utils/validators');
const { generateAppNo } = require('../utils/generateAppNo');
const { sendConsultationEmails } = require('../service/email.service');

/**
 * GET /api/consultation/warmup
 * Fast no-op endpoint for frontend "warmup" pings (e.g. useConsultationWarmup),
 * useful when this backend is hosted on a service that cold-starts.
 */
function warmup(req, res) {
  res.status(200).json({ status: 'awake' });
}

/**
 * POST /api/consultation
 * Validates the submission, generates a display-only application number
 * (no database — nothing is persisted), and sends admin + user emails.
 */
async function submitConsultation(req, res) {
  try {
    const { name, email, phone, service, message } = req.body || {};

    const errors = validateConsultation({ name, email, phone, service, message });
    if (errors.length) {
      return res.status(400).json({ success: false, error: errors.join(' ') });
    }

    const appNo = generateAppNo();

    // Emails are sent best-effort: a delivery failure doesn't fail the
    // request, since the application itself was still validly received.
    await sendConsultationEmails({ name, email, phone, service, message, appNo });

    return res.status(200).json({ success: true, appNo });
  } catch (err) {
    console.error('Unexpected error in submitConsultation:', err);
    return res.status(500).json({ success: false, error: 'Internal server error. Please try again.' });
  }
}

module.exports = { warmup, submitConsultation };