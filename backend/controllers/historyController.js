const ESGSubmission = require("../models/ESGSubmission");

exports.getHistory = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const history = await ESGSubmission.find({ company: companyId }).sort({
      submittedAt: -1,
    });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

exports.deleteHistoryEntry = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const entryId = req.params.id;

    // Make sure entry belongs to this user’s company
    const entry = await ESGSubmission.findOne({
      _id: entryId,
      company: companyId,
    });
    if (!entry) {
      return res.status(404).json({ error: "History entry not found" });
    }

    await ESGSubmission.deleteOne({ _id: entryId });
    res.json({ message: "History entry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete history entry" });
  }
};
