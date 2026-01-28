import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import moduleRoutes from "./routes/moduleRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/modules", moduleRoutes);
app.use("/lessons", lessonRoutes);
app.use("/quiz", quizRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/signly")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
