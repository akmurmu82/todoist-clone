const bcrypt = require("bcrypt");
const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { name, email, password, accountType } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ status: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      accountType,
    });

    // console.log(newUser);

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      jwtSecret
    );
    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

module.exports = registerUser;
