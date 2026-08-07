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

// Parse allowed origins from environment, with fallback to default localhost origins
const configuredOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Default localhost origins for development (always allowed)
const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

// Combine all allowed origins
const allAllowedOrigins = [...new Set([...defaultOrigins, ...configuredOrigins])];

function isAllowedOrigin(origin) {
  if (!origin) {
    // Requests without Origin header (health checks, server-to-server) are allowed
    return true;
  }
  
  const isAllowed = allAllowedOrigins.includes(origin);
  
  // Debug logging: uncomment to troubleshoot
  if (!isAllowed) {
    console.warn(`[CORS] Origin rejected: ${origin}. Allowed: ${allAllowedOrigins.join(", ")}`);
  }
  
  return isAllowed;
}

// CORS configuration
const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    // Reject origin but don't crash
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Total-Count", "X-Page-Number"],
  maxAge: 86400, // 24 hours
};

// Apply CORS to all routes - automatically handles OPTIONS preflight
app.use(cors(corsOptions));

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
