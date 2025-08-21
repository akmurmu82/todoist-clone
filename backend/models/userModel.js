const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String, required: false }, // Make password optional for Google users
  profilePic: { type: String, default: "https://bit.ly/dan-abramov" },
  picture: { type: String }, // For Google profile picture
  accountType: { type: Array },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
