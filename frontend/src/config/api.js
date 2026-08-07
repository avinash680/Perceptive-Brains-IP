/**
 * Resolve the backend API base URL.
 * - VITE_API_URL wins when set at build time (Render/Vercel env).
 * - localhost frontend -> local backend.
 * - Live frontend (perceptive-brains-ip-1) -> Render backend (perceptive-brains-ip).
 */
export function getApiBase() {
  let configuredUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredUrl) {
    if (!/^https?:\/\//i.test(configuredUrl)) {
      configuredUrl = `http://${configuredUrl}`;
    }
    return configuredUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();

    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:5000";
    }

    // Frontend static site on Render (-1) talks to the API service (no -1).
    if (host.includes("perceptive-brains-ip")) {
      return "https://perceptive-brains-ip.onrender.com";
    }
  }

  return "https://perceptive-brains-ip.onrender.com";
}

export default getApiBase;
