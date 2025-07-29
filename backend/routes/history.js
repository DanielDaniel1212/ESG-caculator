const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getHistory,
  deleteHistoryEntry,
} = require("../controllers/historyController");

router.get("/", auth, getHistory);
router.delete("/:id", auth, deleteHistoryEntry); // new route to delete entry by id

module.exports = router;
