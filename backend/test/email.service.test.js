const test = require("node:test");
const assert = require("node:assert/strict");
const { getFromAddress, verifyMailConnection, getResendClient } = require("../service/email.service");

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

test("verifyMailConnection reports missing key when RESEND_API_KEY is unset", () => {
  withEnv({ RESEND_API_KEY: undefined }, () => {
    const result = verifyMailConnection();
    assert.equal(result.ok, false);
    assert.equal(result.error, "RESEND_API_KEY missing");
  });
});

test("verifyMailConnection reports ok when RESEND_API_KEY is present", () => {
  withEnv({ RESEND_API_KEY: "re_test_12345" }, () => {
    const result = verifyMailConnection();
    assert.equal(result.ok, true);
  });
});

test("getFromAddress uses MAIL_FROM env var when configured", () => {
  withEnv({ MAIL_FROM: '"Custom Firm" <contact@example.com>' }, () => {
    assert.equal(getFromAddress(), '"Custom Firm" <contact@example.com>');
  });
});

test("getResendClient throws descriptive error when RESEND_API_KEY is missing", () => {
  withEnv({ RESEND_API_KEY: undefined }, () => {
    assert.throws(() => getResendClient(), /RESEND_API_KEY in your environment/);
  });
});
