require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const consultationRouter = require("./routes/consultation.route");

const app = express();

const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const configuredOrigins = [process.env.CORS_ORIGIN, process.env.FRONTEND_ORIGIN]
  .filter(Boolean)
  .flatMap((value) =>
    value
      .split(/[\n,]/)
      .map((origin) => origin.trim())
      .filter(Boolean)
  );

const renderFrontendOrigins = [
  "https://perceptive-brains-ip-1.onrender.com",
  "https://perceptive-brains-ip.onrender.com",
];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins, ...renderFrontendOrigins]));

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return allowedOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "100kb" }));

// Protects the mail-sending endpoint from spam/abuse.
const consultationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again later." },
});

app.use("/api/consultation", consultationLimiter, consultationRouter);
app.use("/consultation", consultationLimiter, consultationRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Consultation backend running on port ${PORT}`);
});