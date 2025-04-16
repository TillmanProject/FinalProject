// @ts-nocheck
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String },
  taskDurationStart: { type: Date, required: true },
  taskDurationEnd: { type: Date, required: true },
  taskCompleted: { type: Boolean, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);
