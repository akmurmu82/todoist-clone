const express = require("express");
const registerUser = require("../controllers/user/registerUser");
const loginUser = require("../controllers/user/loginUser");
const updateUser = require("../controllers/user/updateUser");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.patch("/update/:userId", updateUser);

module.exports = userRouter;
