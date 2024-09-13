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
    if (!token) {
      res.status(401).json({ message: "Token not provided." });
    }

    const decoded = jwt.verify(token, jwtSecret);
    // Attach decoded information to the request body
    req.body.userId = decoded.userId;
    req.body.userName = decoded.userName;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: error });
    }
  }
};

module.exports = auth;
