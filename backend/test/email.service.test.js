const test = require("node:test");
const assert = require("node:assert/strict");
const { withTimeout, buildTransportConfig } = require("../service/email.service");

function withEnv(overrides, fn) {
  const previousValues = {};

  Object.entries(overrides).forEach(([key, value]) => {
    previousValues[key] = process.env[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  });

  try {
    return fn();
  } finally {
    Object.entries(previousValues).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  }
}

test("withTimeout returns the fallback value when the operation times out", async () => {
  const result = await withTimeout(() => new Promise(() => {}), 20, "fallback");
  assert.equal(result, "fallback");
});

test("withTimeout returns the real value when the operation resolves first", async () => {
  const result = await withTimeout(() => Promise.resolve("ok"), 50, "fallback");
  assert.equal(result, "ok");
});

test("buildTransportConfig uses explicit SMTP settings when provided", () => {
  const config = withEnv(
    {
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "2525",
      SMTP_SECURE: "true",
      SMTP_USER: "sender@example.com",
      SMTP_PASS: "secret-pass",
    },
    () => buildTransportConfig()
  );

  assert.equal(config.host, "smtp.example.com");
  assert.equal(config.port, 2525);
  assert.equal(config.secure, true);
  assert.deepEqual(config.auth, { user: "sender@example.com", pass: "secret-pass" });
});

test("buildTransportConfig falls back to Gmail when no SMTP host is provided", () => {
  const config = withEnv(
    {
      GMAIL_USER: "sender@gmail.com",
      GMAIL_APP_PASSWORD: "app-password",
      SMTP_HOST: undefined,
      SMTP_PORT: undefined,
      SMTP_SECURE: undefined,
      SMTP_USER: undefined,
      SMTP_PASS: undefined,
    },
    () => buildTransportConfig()
  );

  assert.equal(config.host, "smtp.gmail.com");
  assert.equal(config.port, 587);
  assert.equal(config.secure, false);
  assert.equal(config.family, 4);
  assert.deepEqual(config.auth, { user: "sender@gmail.com", pass: "app-password" });
});
