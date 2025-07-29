const ESGSubmission = require("../models/ESGSubmission");

exports.submitESG = async (req, res) => {
  try {
    const companyId = req.user.companyId; // ✅ Ensure this matches your token payload

    const {
      submissionDate, // <-- NEW: Get submission date from frontend
      environment,
      social,
      governance,
      supplyChain,
    } = req.body;

    if (!submissionDate) {
      return res.status(400).json({ error: "submissionDate is required." });
    }

    const avg = (obj) =>
      Object.values(obj).reduce((a, b) => a + b, 0) / Object.values(obj).length;

    const environmentScore = avg(environment);
    const socialScore = avg(social);
    const governanceScore = avg(governance);
    const supplyChainScore = avg(supplyChain);

    const totalScore = Math.round(
      (environmentScore + socialScore + governanceScore + supplyChainScore) / 4
    );

    let grade;
    if (totalScore >= 85) grade = "A";
    else if (totalScore >= 70) grade = "B";
    else if (totalScore >= 50) grade = "C";
    else grade = "High Risk";

    const submission = new ESGSubmission({
      company: companyId,
      submissionDate: new Date(submissionDate), // ✅ Store date
      environment: { ...environment, weightedScore: environmentScore },
      social: { ...social, weightedScore: socialScore },
      governance: { ...governance, weightedScore: governanceScore },
      supplyChain: { ...supplyChain, weightedScore: supplyChainScore },
      totalScore,
      grade,
    });

    await submission.save();

    console.log("Submitted ESG form:", submission); // ✅ Console log

    res.status(201).json({ message: "ESG data submitted", submission });
  } catch (err) {
    console.error("Error in submitESG:", err);
    res.status(500).json({
      error: "Failed to submit ESG data",
      details: err.message,
    });
  }
};
