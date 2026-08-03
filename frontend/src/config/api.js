export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:5000";
    }
  }

  return "https://perceptive-brains-ip.onrender.com";
}

export default getApiBase;
