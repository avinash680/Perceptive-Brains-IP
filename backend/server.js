require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const consultationRouter = require("./routes/consultation.route");
const { verifyMailConnection } = require("./service/email.service");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json({ limit: "100kb" }));

const consultationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again later." },
});

app.use("/api/consultation", consultationLimiter, consultationRouter);
app.use("/consultation", consultationLimiter, consultationRouter);

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
