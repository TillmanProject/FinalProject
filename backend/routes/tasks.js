const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const router = express.Router();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

router.post("/", authenticate, async (req, res) => {
  const { title, description, completed, category, userId } = req.body;
  try {
    const task = new Task({ title, description, completed, category, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

router.get("/", authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.put("/:id", authenticate, async (req, res) => {
  await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body
  );
  res.json({ message: "Task updated" });
});

router.delete("/:id", authenticate, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;
