const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Example API route
app.get("/api/status", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Start the server on port 5000 (or use PORT env variable)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
