import express from "express";
import Lesson from "../models/Lesson.js";

const router = express.Router();

// Get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("module");
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lessons by module
router.get("/module/:moduleId", async (req, res) => {
  try {
    const lessons = await Lesson.find({ module: req.params.moduleId });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single lesson
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("module");
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create lesson
router.post("/", async (req, res) => {
  const lesson = new Lesson({
    module: req.body.module,
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newLesson = await lesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lesson
router.patch("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (req.body.title) lesson.title = req.body.title;
    if (req.body.content) lesson.content = req.body.content;
    if (req.body.module) lesson.module = req.body.module;

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete lesson
router.delete("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
