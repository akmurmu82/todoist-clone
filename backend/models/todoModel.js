const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String },
  createdOn: { type: String },
  isCompleted: { type: Boolean, default: false, enum: [true, false] },
  description: { type: String },
  priority: { type: String, enum: ["low", "medium", "high"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
