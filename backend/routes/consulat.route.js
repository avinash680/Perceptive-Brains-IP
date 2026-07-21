const express = require("express");
const router = express.Router();

const { submitConsultation } = require("../controllers/consultation.cotroller");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Consultation endpoint is active.",
  });
});

router.post("/", submitConsultation);

module.exports = router;