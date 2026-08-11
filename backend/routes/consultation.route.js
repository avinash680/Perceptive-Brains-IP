const express = require('express');
const { warmup, submitConsultation } = require('../controllers/consultation.controller');

const router = express.Router();

// GET /api/consultation/warmup
router.get('/warmup', warmup);

// POST /api/consultation
router.post('/', submitConsultation);

module.exports = router;