const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

/**
 * Validates a consultation form submission.
 * Returns an array of human-readable error strings (empty array = valid).
 */
function validateConsultation({ name, email, phone, service, message }) {
  const errors = [];

  if (!name || !name.trim()) errors.push('Name is required.');
  if (!email || !EMAIL_REGEX.test(email)) errors.push('A valid email is required.');
  if (!phone || !PHONE_REGEX.test(phone)) errors.push('A valid phone number is required.');
  if (!service || !service.trim()) errors.push('Service is required.');
  if (!message || !message.trim()) errors.push('Message is required.');

  return errors;
}

module.exports = { validateConsultation, EMAIL_REGEX, PHONE_REGEX };