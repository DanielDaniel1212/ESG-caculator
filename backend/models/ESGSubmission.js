const mongoose = require("mongoose");

const ESGSubmissionSchema = new mongoose.Schema({
  // 🔹 Remove manual company field – set from JWT middleware
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  // 🔹 Custom submission date (user-defined, e.g. 2025-07-29)
  submissionDate: {
    type: Date,
    required: true,
  },

  environment: {
    energyConsumption: { type: Number, required: true },
    ghgEmissions: { type: Number, required: true },
    circularEconomy: { type: Number, required: true },
    pollutionManagement: { type: Number, required: true },
    biodiversity: { type: Number, required: true },
    weightedScore: { type: Number },
  },

  social: {
    workerRights: { type: Number, required: true },
    dei: { type: Number, required: true },
    supplyChainLabor: { type: Number, required: true },
    communityEngagement: { type: Number, required: true },
    consumerWelfare: { type: Number, required: true },
    weightedScore: { type: Number },
  },

  governance: {
    antiCorruption: { type: Number, required: true },
    boardDiversity: { type: Number, required: true },
    execPayTransparency: { type: Number, required: true },
    cybersecurity: { type: Number, required: true },
    lobbyingDisclosure: { type: Number, required: true },
    weightedScore: { type: Number },
  },

  supplyChain: {
    codeOfConduct: { type: Number, required: true },
    riskAssessment: { type: Number, required: true },
    audits: { type: Number, required: true },
    sustainableSourcing: { type: Number, required: true },
    conflictMinerals: { type: Number, required: true },
    weightedScore: { type: Number },
  },

  totalScore: { type: Number },
  grade: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

// 🔧 Auto-calculate weighted scores and grade
ESGSubmissionSchema.pre("save", function (next) {
  const calcAvg = (section) => {
    const keys = Object.keys(section).filter(
      (key) => typeof section[key] === "number"
    );
    const total = keys.reduce((sum, key) => sum + section[key], 0);
    return parseFloat((total / keys.length).toFixed(2));
  };

  this.environment.weightedScore = calcAvg(this.environment);
  this.social.weightedScore = calcAvg(this.social);
  this.governance.weightedScore = calcAvg(this.governance);
  this.supplyChain.weightedScore = calcAvg(this.supplyChain);

  const avg =
    (this.environment.weightedScore +
      this.social.weightedScore +
      this.governance.weightedScore +
      this.supplyChain.weightedScore) /
    4;

  this.totalScore = parseFloat(avg.toFixed(2));

  if (avg >= 85) this.grade = "A";
  else if (avg >= 70) this.grade = "B";
  else if (avg >= 55) this.grade = "C";
  else this.grade = "High Risk";

  next();
});

module.exports = mongoose.model("ESGSubmission", ESGSubmissionSchema);
