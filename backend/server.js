const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const moduleRoutes = require("./routes/moduleRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/modules", moduleRoutes);
app.use("/lessons", lessonRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/signly")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
