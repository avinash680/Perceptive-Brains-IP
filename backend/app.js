const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const consultationRoutes = require('./routes/consultation.route');

const app = express();

// ---------- Middleware ----------
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: No rate limiter / submission cap is applied here on purpose,
// per the requirement to accept submissions "without any limit".
// If you later want abuse protection, add express-rate-limit here.

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Consultation backend is running.' });
});

app.use('/api/consultation', consultationRoutes);

// Serve frontend production build (if present) and provide SPA fallback
try {
  const distPath = path.join(__dirname, '..', 'frontend', 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    // For any non-API route, return index.html so the client-side router can handle it
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
} catch (e) {
  // If something goes wrong checking/serving static files, continue without breaking the API
  console.error('Error setting up static frontend serving:', e);
}

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// ---------- Central error handler (catches anything thrown outside controllers) ----------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
});

module.exports = app;