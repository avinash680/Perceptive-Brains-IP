const test = require("node:test");
const assert = require("node:assert/strict");
const { withTimeout } = require("../service/email.service");

test("withTimeout returns the fallback value when the operation times out", async () => {
  const result = await withTimeout(() => new Promise(() => {}), 20, "fallback");
  assert.equal(result, "fallback");
});

test("withTimeout returns the real value when the operation resolves first", async () => {
  const result = await withTimeout(() => Promise.resolve("ok"), 50, "fallback");
  assert.equal(result, "ok");
});
