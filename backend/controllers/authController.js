const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const UserModel = require("../models/userModel");

const jwtSecret = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const dbUser = await UserModel.findOne({ email });
        if (!dbUser) {
            return res.status(404).json({ status: false, message: "User not registered." });
        }

        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (!isMatch) {
            return res.status(409).json({ status: false, message: "Wrong password" });
        }

        const token = jwt.sign({ userId: dbUser._id }, jwtSecret, { expiresIn: "7d" });

        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            token,
            user: { id: dbUser._id, name: dbUser.name, email: dbUser.email }, // safe response
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        console.log("token:", token)

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        console.log("Ticket:", ticket)

        const payload = ticket.getPayload(); // { email, name, picture, sub }

        let user = await UserModel.findOne({ email: payload.email });
        if (!user) {
            user = await UserModel.create({
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                password: null, // make optional in schema for social login
            });
        }

        const appToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "7d" });

        // res.json({ token: appToken, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
        res.redirect(`${CLIENT_URL}/home`);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password, accountType } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res
                .status(401)
                .json({ status: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            accountType,
        });

        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: "7d" });

        await newUser.save();

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email }, // safe response
            token,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password, profilePic, accountType, todoId } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        if (profilePic) updateData.profilePic = profilePic;
        if (accountType) updateData.accountType = accountType;

        // If a todoId is provided, add it to the user's todos array
        let updatedUser;
        if (todoId) {
            // Use $push to add the new todoId to the user's todos array
            updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $set: updateData,
                    // $push: { todos: todoId }, // Add todoId to the todos array
                    $addToSet: { todos: todoId } // Avoid duplicates with $addToSet
                },
                { new: true }
            );
        } else {
            // Otherwise, just update the user fields without modifying todos
            updatedUser = await UserModel.findByIdAndUpdate(
                { _id: userId },
                { $set: updateData },
                // { ...updateData },
                { new: true }
            );
        }

        // If no user is found with the provided ID
        if (!updatedUser) {
            return res.status(404).json({ status: false, message: "Todo not found" });
        }

        // Return the updated user in the response
        res.status(200).json({ status: true, data: updatedUser });
    } catch (error) {
        return res
            .status(500)
            .json({ status: false, error, message: "Error updating User" });
    }
};

module.exports = { loginUser, googleLogin, registerUser, updateUser };
