const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superAdmin.controller");

// Create a new super admin
router.post("/", superAdminController.createSuperAdmin);

// Retrieve all super admins
router.get("/", superAdminController.getAllSuperAdmins);

// Retrieve a single super admin by ID
router.get("/:id", superAdminController.getSuperAdminById);

// Update a super admin by ID
router.put("/:id", superAdminController.updateSuperAdmin);

// Delete a super admin by ID
router.delete("/:id", superAdminController.deleteSuperAdmin);

module.exports = router;
