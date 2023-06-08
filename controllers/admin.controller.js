const Admin = require("../models/admin.model");

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create admin" });
  }
};

// Retrieve all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve admins" });
  }
};

// Retrieve a single admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve admin" });
  }
};

// Update an admin by ID
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const admin = await Admin.findByPk(id);
    if (admin) {
      admin.username = username;
      admin.password = password;
      await admin.save();
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update admin" });
  }
};

// Delete an admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete admin" });
  }
};
