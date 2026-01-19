const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Progress", progressSchema);
