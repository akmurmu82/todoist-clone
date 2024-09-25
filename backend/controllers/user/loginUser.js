const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await UserModel.findOne({ email });
    if (!dbUser) {
      return res
        .status(404)
        .json({ status: false, message: "User not registered." });
    }

    const isMatch = await bcrypt.compare(password, dbUser.password);
    // is the isMatch a boolean or the user?

    if (!isMatch) {
      return res.status(409).json({ status: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      jwtSecret
    );

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token,
      user: dbUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

module.exports = loginUser;
