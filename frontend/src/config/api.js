export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host.includes("perceptive-brains-ip")) {
      return "https://perceptive-brains-ip.onrender.com";
    }
  }

  return "http://localhost:8080";
}

export default getApiBase;
