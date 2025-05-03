const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./backend/routes/users");
const taskRoutes = require("./backend/routes/tasks");
const app = express();

require("dotenv").config();
app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
