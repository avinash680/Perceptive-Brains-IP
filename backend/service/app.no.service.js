const crypto = require('crypto');

/**
 * Generates a display-only application/reference number.
 * There is no database, so this is derived from the current date plus a
 * random suffix rather than an incrementing counter. It's unique enough
 * to show the user and reference in emails, but is NOT persisted anywhere.
 *
 * Format: IP-YYYYMMDD-XXXXXX (e.g. IP-20260810-4F9A2B)
 */
function generateAppNo() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randPart = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `IP-${datePart}-${randPart}`;
}

module.exports = { generateAppNo };