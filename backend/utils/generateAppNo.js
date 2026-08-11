// Generates a short, human-friendly application/reference number.
function generateAppNo() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `APP-${timestamp}-${rand}`;
}

module.exports = { generateAppNo };
