import { getApiBase } from "../config/api";

const CONSULTATION_PATH = "/consultation";
const REQUEST_TIMEOUT_MS = 45000;
const MAX_ATTEMPTS = 2;

export function getConsultationUrl() {
  return `${getApiBase().replace(/\/$/, "")}${CONSULTATION_PATH}`;
}

/** Wake Render before the user submits (free tier cold starts can exceed 15s). */
export async function warmUpConsultationApi() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  try {
    await fetch(getConsultationUrl(), { method: "GET", signal: controller.signal });
  } catch {
    // Warm-up is best-effort only.
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getConsultationErrorMessage(err, url) {
  const message =
    err?.name === "AbortError"
      ? "The server took too long to respond. Please try again in a moment."
      : err instanceof TypeError
        ? "Could not reach the server. Please check your connection and try again."
        : err?.message || "Something went wrong. Please try again.";

  return url ? `${message} (endpoint: ${url})` : message;
}

export async function submitConsultation(form) {
  const url = getConsultationUrl();
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const start = Date.now();
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      const duration = Date.now() - start;
      const raw = await res.text();
      let data = null;

      try {
        data = JSON.parse(raw);
      } catch {
        data = raw;
      }

      if (!res.ok) {
        const errText = typeof data === "string" ? data : JSON.stringify(data);
        throw new Error(data?.error || `Unexpected response (${res.status}): ${errText}`);
      }

      if (typeof data === "object" && data !== null && data.success === false) {
        throw new Error(data.error || "Server returned an unsuccessful response.");
      }

      return {
        status: res.status,
        duration,
        data: typeof data === "object" && data !== null ? data : {},
      };
    } catch (err) {
      lastError = err;
      const shouldRetry =
        attempt < MAX_ATTEMPTS && (err.name === "AbortError" || err instanceof TypeError);

      if (!shouldRetry) {
        break;
      }

      await new Promise((resolve) => window.setTimeout(resolve, 1500));
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastError;
}
