import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

export default mongoose.model("Lesson", lessonSchema);
