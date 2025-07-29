require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Or the correct frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Hello from ESG backend!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/esg"));
app.use("/api/history", require("./routes/history"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
