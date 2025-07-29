module.exports = function calculateESGScore(form) {
  const { environment, social, governance, procurement } = form;

  const weighted =
    environment * 0.25 + social * 0.25 + governance * 0.25 + procurement * 0.25;

  let grade;
  if (weighted >= 85) grade = "A";
  else if (weighted >= 70) grade = "B";
  else if (weighted >= 50) grade = "C";
  else grade = "High Risk";

  return { totalScore: weighted, grade };
};
