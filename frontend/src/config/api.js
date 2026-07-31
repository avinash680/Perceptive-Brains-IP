export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch (e) {
      // invalid configured URL — fall through to defaults
    }
  }

  if (typeof window === "undefined") {
    return "http://localhost:8080";
  }

  const host = window.location.hostname;
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host);
  if (isLocalHost) {
    return "http://localhost:8080";
  }

  // Use same origin in production by default.
  return `${window.location.protocol}//${window.location.host}`;
}

export default getApiBase;
