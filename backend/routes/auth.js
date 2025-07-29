const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Company = require("../models/Company");

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/register
router.post("/register", async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists." });
    }

    const newCompany = new Company({ companyName, email, password });
    await newCompany.save();

    // ✅ Generate real JWT
    const token = jwt.sign({ companyId: newCompany._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Company registered successfully.",
      companyName: newCompany.companyName,
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company || company.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Generate real JWT
    const token = jwt.sign({ companyId: company._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful.",
      companyName: company.companyName,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
