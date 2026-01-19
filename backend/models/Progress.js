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
  score: Number,
  totalQuestions: Number,
  completed: Boolean
});

export default mongoose.model("Progress", progressSchema);
