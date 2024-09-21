const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profilePic: { type: String },
  accountType: { type: Array },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
