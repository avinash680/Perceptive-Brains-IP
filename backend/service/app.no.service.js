/**
 * Generates a human-friendly application number without needing a database.
 * Format: IP-YYMMDD-XXXX  (e.g. IP-260802-4831)
 * The date portion + a random 4-digit suffix keeps collisions practically
 * negligible for a low/medium volume contact form.
 */
function generateAppNo() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IP-${yy}${mm}${dd}-${rand}`;
}

module.exports = { generateAppNo };