const express = require("express");
const registerUser = require("../controllers/user/registerUser");
const loginUser = require("../controllers/user/loginUser");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
