const express = require("express");
const router = express.Router();

const {
  submitConsultation,
  getEmailHealth,
} = require("../controllers/consultation.controller");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Consultation endpoint is active.",
  });
});

router.get("/email-health", getEmailHealth);

router.post("/", submitConsultation);

module.exports = router;
