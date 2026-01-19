const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: Number, // index of correct option
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  questions: [questionSchema]
});

module.exports = mongoose.model("Quiz", quizSchema);
