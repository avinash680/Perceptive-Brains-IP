const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("child_process");
const path = require("path");
const { once } = require("events");

function waitForServer(port, timeoutMs = 10000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for server on port ${port}`));
        return;
      }

      fetch(`http://127.0.0.1:${port}/health`)
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            setTimeout(attempt, 200);
          }
        })
        .catch(() => {
          setTimeout(attempt, 200);
        });
    };

    attempt();
  });
}

test("consultation warmup endpoint is served under /api/consultation", async () => {
  const server = spawn(process.execPath, ["server.js"], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, PORT: "5011" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  try {
    await waitForServer(5011);

    const response = await fetch("http://127.0.0.1:5011/api/consultation/warmup");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "warm" });

    const legacyResponse = await fetch("http://127.0.0.1:5011/consultation/warmup");
    assert.equal(legacyResponse.status, 200);
    assert.deepEqual(await legacyResponse.json(), { status: "warm" });

    const origin = "https://perceptive-brains-ip-1.onrender.com";
    const preflight = await fetch("http://127.0.0.1:5011/api/consultation", {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), origin);
    assert.match(preflight.headers.get("access-control-allow-methods"), /POST/);
    assert.equal(preflight.headers.get("cross-origin-resource-policy"), "cross-origin");
  } finally {
    server.kill("SIGTERM");
    await once(server, "exit").catch(() => {});
  }
});

test("consultation submission remains successful when email delivery is unavailable", async () => {
  const controller = require("../controllers/consultation.controller");
  const originalUser = process.env.GMAIL_USER;
  const originalPassword = process.env.GMAIL_APP_PASSWORD;
  const originalSmtpUser = process.env.SMTP_USER;
  const originalSmtpPass = process.env.SMTP_PASS;

  process.env.GMAIL_USER = "";
  process.env.GMAIL_APP_PASSWORD = "";
  process.env.SMTP_USER = "";
  process.env.SMTP_PASS = "";

  try {
    const req = {
      body: {
        name: "Test User",
        email: "user@example.com",
        phone: "1234567890",
        service: "Trademark",
        message: "Please review this request.",
      },
    };

    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    await controller.submitConsultation(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.userEmailSent, false);
    assert.equal(res.body.adminEmailSent, false);
    assert.equal(res.body.notificationsPending, true);
    assert.ok(typeof res.body.adminEmailError === "string");
    assert.ok(typeof res.body.userEmailError === "string");
  } finally {
    if (originalUser === undefined) delete process.env.GMAIL_USER; else process.env.GMAIL_USER = originalUser;
    if (originalPassword === undefined) delete process.env.GMAIL_APP_PASSWORD; else process.env.GMAIL_APP_PASSWORD = originalPassword;
    if (originalSmtpUser === undefined) delete process.env.SMTP_USER; else process.env.SMTP_USER = originalSmtpUser;
    if (originalSmtpPass === undefined) delete process.env.SMTP_PASS; else process.env.SMTP_PASS = originalSmtpPass;
  }
});
