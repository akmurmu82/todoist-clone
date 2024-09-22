const UserModel = require("../../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

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
// 66ee5ac078dff27093279e3d
module.exports = updateUser;
