const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.companyId) {
      return res.status(401).json({ message: "Token missing companyId" });
    }

    req.user = { companyId: decoded.companyId }; // ✅ only attach what you need
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
