const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { submitESG } = require("../controllers/esgController");

router.post("/esg-score", auth, submitESG);

module.exports = router;
