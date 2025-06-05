
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String },
  isCompleted: { type: Boolean, default: false, enum: [true, false] },
  description: { type: String, default: "No description is added" },
  priority: { type: String, default: "low", enum: ["low", "medium", "high"], default: "low" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  dueDate: { type: String },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
