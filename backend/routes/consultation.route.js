const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultation.controller");

/**
 * ROUTES
 * ------
 * This file ONLY maps "HTTP method + path" to a controller function.
 * No business logic here on purpose - if you're scrolling through this file
 * looking for "how are emails sent", you're in the wrong file; that's in
 * controllers/consultationController.js and services/*.js
 */

// Pinged by the frontend on mount, just to "wake up" the server early
router.get("/warmup", consultationController.warmup);

// Main form submission endpoint
router.post("/", consultationController.submitConsultation);

module.exports = router;