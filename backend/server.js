require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const consultationRouter = require("./routes/consultation.route");
const { verifyMailConnection } = require("./service/email.service");

const app = express();
app.set("trust proxy", 1);

// This API is intentionally consumed by the separately hosted frontend. Helmet's
// default CORP header is `same-origin`, which makes browsers discard an otherwise
// valid CORS response. Allow cross-origin reads for these public JSON endpoints.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const configuredOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAnyOrigin = configuredOrigins.includes("*");

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (health checks, curl, server-to-server)
      // do not need CORS validation.
      if (!origin || allowAnyOrigin || configuredOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);
app.use(express.json({ limit: "100kb" }));

// Only submissions consume the small abuse-prevention quota. The warm-up GET is
// called when a visitor opens the page and must not make their later form POST 429.
app.use("/api/consultation", consultationRouter);
app.use("/consultation", consultationRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/", (req, res) => {
  res.json({
    service: "Perceptive Brains IP API",
    health: "/health",
    consultation: "/api/consultation",
    warmup: "/api/consultation/warmup",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Consultation backend running on port ${PORT}`);
  verifyMailConnection();
});

module.exports = app;
