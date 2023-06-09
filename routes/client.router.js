const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");

// Create a new client
router.post("/", clientController.createClient);

// Retrieve all clients
router.get("/", clientController.getAllClients);

// Retrieve a single client by ID
router.get("/:id", clientController.getClientById);

// Update a client by ID
router.put("/:id", clientController.updateClient);

// Delete a client by ID
router.delete("/:id", clientController.deleteClient);

// Signup route
router.post("/signup", clientController.signup);

// Login route
router.post("/login", clientController.login);

module.exports = router;
