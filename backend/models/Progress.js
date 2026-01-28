import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
  score: Number,
  totalQuestions: Number,
  completed: Boolean,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Progress", progressSchema);
