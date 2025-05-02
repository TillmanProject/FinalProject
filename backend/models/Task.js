// @ts-nocheck
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  taskDescription: { type: String },
  taskCompleted: { type: Boolean, required: true },
  taskCategory: { type: Boolean, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", taskSchema);
