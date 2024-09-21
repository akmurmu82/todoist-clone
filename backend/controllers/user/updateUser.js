const UserModel = require("../../models/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const updateUser = async (req, res) => {

  try {
    const { userId } = req.params;
    const { name, email, password, profilePic, accountType } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (profilePic) updateData.profilePic = profilePic;
    if (accountType) updateData.accountType = accountType;

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {$set:updateData },
      // { ...updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }
    res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error, message: "Error updating User" });
  }
};

module.exports = updateUser;
