export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch (e) {
      // invalid configured URL — fall through to defaults
    }
  }

  const host = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host);
  return isLocalHost ? "http://localhost:8080" : "https://perceptive-brains-ip.onrender.com";
}

export default getApiBase;
