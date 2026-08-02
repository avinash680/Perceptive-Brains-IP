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
  } finally {
    server.kill("SIGTERM");
    await once(server, "exit").catch(() => {});
  }
});
