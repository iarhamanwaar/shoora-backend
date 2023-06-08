const SuperAdmin = require("../models/superAdmin.model");

// Create a new super admin
exports.createSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const superAdmin = await SuperAdmin.create({ username, password });
    res.status(201).json(superAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create super admin" });
  }
};

// Retrieve all super admins
exports.getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.findAll();
    res.json(superAdmins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve super admins" });
  }
};

// Retrieve a single super admin by ID
exports.getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmin.findByPk(id, {
      include: { model: Admin, as: "admins" },
    });
    if (superAdmin) {
      res.json(superAdmin);
    } else {
      res.status(404).json({ error: "Super admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve super admin" });
  }
};

// Update a super admin by ID
exports.updateSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const superAdmin = await SuperAdmin.findByPk(id);
    if (superAdmin) {
      superAdmin.username = username;
      superAdmin.password = password;
      await superAdmin.save();
      res.json(superAdmin);
    } else {
      res.status(404).json({ error: "Super admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update super admin" });
  }
};

// Delete a super admin by ID
exports.deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmin.findByPk(id);
    if (superAdmin) {
      await superAdmin.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Super admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete super admin" });
  }
};
