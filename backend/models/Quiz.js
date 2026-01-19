import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number
});

const quizSchema = new mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  questions: [questionSchema]
});

export default mongoose.model("Quiz", quizSchema);
