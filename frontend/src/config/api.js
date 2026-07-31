export function getApiBase() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  return "http://localhost:5000";
}

export default getApiBase;
