import { getApiBase } from "../config/api";

export function getConsultationUrl() {
  return `${getApiBase()}/api/consultation`;
}

export function getWarmupUrl() {
  return `${getApiBase()}/api/consultation/warmup`;
}

export async function warmUpConsultationApi() {
  try {
    await fetch(getWarmupUrl(), { method: "GET" });
  } catch {
    // Warmup is best-effort; ignore failures so the app can still load.
  }
}

/**
 * Submits the consultation form to the backend.
 * Returns { status, duration, data } where data is the parsed JSON body:
 *   { success: true, appNo, userEmailSent }  on success
 *   { success: false, error }                on failure
 */
export async function submitConsultation(form) {
  const url = getConsultationUrl();
  const start = performance.now();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const duration = performance.now() - start;

  let data;
  try {
    data = await response.json();
  } catch {
    data = { success: false, error: "Received an unreadable response from the server." };
  }

  if (!response.ok || !data.success) {
    const errorMsg = data.error || `Server responded with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    throw error;
  }

  return { status: response.status, duration, data };
}

export function getConsultationErrorMessage(err, url) {
  const isLocalApi = /localhost|127\.0\.0\.1/.test(url || "");
  const isLiveSite =
    typeof window !== "undefined" &&
    window.location &&
    !/localhost|127\.0\.0\.1/.test(window.location.hostname);

  if (isLocalApi && isLiveSite) {
    return "Configuration Error: The live website is trying to reach localhost. Set VITE_API_URL to https://perceptive-brains-ip.onrender.com on your frontend hosting (Render/Vercel).";
  }

  if (err?.name === "TypeError" || /fetch/i.test(err?.message || "")) {
    return "We couldn't reach the server. Please check your connection and try again.";
  }
  if (err?.message) {
    return err.message;
  }
  return "Something went wrong while submitting your application. Please try again.";
}
