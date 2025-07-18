const express = require("express");
const cors = require("cors"); // <- ADD THIS

const app = express();
app.use(cors()); // <- ADD THIS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from hi backend!");
});

app.get("/api/status", (req, res) => {
  res.json({ status: "Backend is running" });
});

app.get("/api/hello", (req, res) => {
  res.send("Hello from backend");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
