const Client = require("../models/client.model");

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      email,
      googleSignIn,
      microsoftSignIn,
      appleSignIn,
      otpSignIn,
    } = req.body;
    const client = await Client.create({
      fullName,
      dob,
      email,
      googleSignIn,
      microsoftSignIn,
      appleSignIn,
      otpSignIn,
    });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create client" });
  }
};

// Retrieve all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve clients" });
  }
};

// Retrieve a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id, {
      include: { model: Consultation, as: "consultations" },
    });
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve client" });
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      dob,
      email,
      googleSignIn,
      microsoftSignIn,
      appleSignIn,
      otpSignIn,
    } = req.body;
    const client = await Client.findByPk(id);
    if (client) {
      client.fullName = fullName;
      client.dob = dob;
      client.email = email;
      client.googleSignIn = googleSignIn;
      client.microsoftSignIn = microsoftSignIn;
      client.appleSignIn = appleSignIn;
      client.otpSignIn = otpSignIn;
      await client.save();
      res.json(client);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update client" });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (client) {
      await client.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete client" });
  }
};
