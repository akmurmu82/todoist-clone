const express = require("express");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
