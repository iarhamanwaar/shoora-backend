const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Consultant = require("../models/consultant.model");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      license,
      certificates,
      mobile,
      email,
      password,
      photo,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the consultant to the database
    const consultant = await Consultant.create({
      fullName,
      dob,
      license,
      certificates,
      mobile,
      email,
      password: hashedPassword,
      photo,
    });

    // Generate JWT token
    const token = jwt.sign(
      { consultantId: consultant.id },
      process.env.JWT_ACCESS_SECRET
    );

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the consultant in the database by email
    const consultant = await Consultant.findOne({ where: { email } });

    // If consultant not found or password does not match
    if (!consultant || !(await bcrypt.compare(password, consultant.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { consultantId: consultant.id },
      process.env.JWT_ACCESS_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Create a new consultant
exports.createConsultant = async (req, res) => {
  try {
    const { fullName, dob, license, certificates, mobile, email, photo } =
      req.body;
    const consultant = await Consultant.create({
      fullName,
      dob,
      license,
      certificates,
      mobile,
      email,
      photo,
    });
    res.status(201).json(consultant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create consultant" });
  }
};

// Retrieve all consultants
exports.getAllConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.findAll();
    res.json(consultants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve consultants" });
  }
};

// Retrieve a single consultant by ID
exports.getConsultantById = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await Consultant.findByPk(id);
    if (consultant) {
      res.json(consultant);
    } else {
      res.status(404).json({ error: "Consultant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve consultant" });
  }
};

// Update a consultant by ID
exports.updateConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, dob, license, certificates, mobile, email, photo } =
      req.body;
    const consultant = await Consultant.findByPk(id);
    if (consultant) {
      consultant.fullName = fullName;
      consultant.dob = dob;
      consultant.license = license;
      consultant.certificates = certificates;
      consultant.mobile = mobile;
      consultant.email = email;
      consultant.photo = photo;
      await consultant.save();
      res.json(consultant);
    } else {
      res.status(404).json({ error: "Consultant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update consultant" });
  }
};

// Delete a consultant by ID
exports.deleteConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await Consultant.findByPk(id);
    if (consultant) {
      await consultant.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Consultant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete consultant" });
  }
};
