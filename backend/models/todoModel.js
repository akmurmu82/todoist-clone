const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String },
  createdOn: { type: String },
  isCompleted: { type: Boolean },
  description: { type: String },
  priority: { type: String },
  userId: { type: String },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
