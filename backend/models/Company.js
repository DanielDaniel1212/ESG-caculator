const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("Company", CompanySchema);
