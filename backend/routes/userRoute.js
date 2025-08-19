const express = require("express");
const { registerUser, loginUser, googleLogin, updateUser } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/auth/google", googleLogin);
userRouter.patch("/update/:userId", updateUser);

module.exports = userRouter;
