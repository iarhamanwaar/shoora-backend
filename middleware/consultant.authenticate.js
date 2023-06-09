const jwt = require("jsonwebtoken");
const Consultant = require("../models/consultant.model");

const authenticate = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find the user in the database
    const user = await Consultant.findByPk(decoded.consultantId);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid tokens
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
