// Base URL of your Express backend. Set VITE_API_URL in your .env for
// production (e.g. https://api.yourfirm.com). Falls back to localhost for dev.
const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL?.trim()) ||
  "http://localhost:5000";

export function getConsultationUrl() {
  return `${API_BASE_URL}/api/consultation`;
}

export function getWarmupUrl() {
  return `${API_BASE_URL}/api/consultation/warmup`;
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

/**
 * Turns a thrown error (network failure, timeout, etc.) into a friendly
 * message for display in the form's error banner.
 */
export function getConsultationErrorMessage(err, url) {
  // If the API URL contains localhost/127.0.0.1 but the website is accessed via a live public domain,
  // it means the developer forgot to configure VITE_API_URL on their hosting provider.
  const isLocalApi = /localhost|127\.0\.0\.1/.test(url || "");
  const isLiveSite = typeof window !== "undefined" && window.location && !/localhost|127\.0\.0\.1/.test(window.location.hostname);

  if (isLocalApi && isLiveSite) {
    return "Configuration Error: The website is live but trying to connect to a local backend (localhost). Please set the VITE_API_URL environment variable on your hosting platform (like Vercel, Netlify or Render) to point to your live Render backend URL.";
  }

  if (err?.name === "TypeError" || /fetch/i.test(err?.message || "")) {
    return "We couldn't reach the server. Please check your connection and try again.";
  }
  if (err?.message) {
    return err.message;
  }
  return "Something went wrong while submitting your application. Please try again.";
}