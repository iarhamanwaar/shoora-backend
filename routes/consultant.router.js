const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultant.controller");

// Create a new consultant
router.post("/", consultantController.createConsultant);

// Retrieve all consultants
router.get("/", consultantController.getAllConsultants);

// Retrieve a single consultant by ID
router.get("/:id", consultantController.getConsultantById);

// Update a consultant by ID
router.put("/:id", consultantController.updateConsultant);

// Delete a consultant by ID
router.delete("/:id", consultantController.deleteConsultant);

module.exports = router;
