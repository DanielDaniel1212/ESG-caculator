const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const company = await Company.create({ name, email, password: hashed });
  res.status(201).json({ message: "Registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const company = await Company.findOne({ email });
  if (!company || !(await bcrypt.compare(password, company.password)))
    return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, name: company.name });
};
