require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("Missing JWT_SECRET in environment variables");

const auth = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeaders.split(" ")[1];
    // console.log("Auth Header:", authHeaders);
    // console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Token not provided." });
    }

    const decoded = jwt.verify(token, jwtSecret);

    // ✅ Attach user info to req.user
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = auth;
