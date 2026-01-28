import express from "express";
import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";

const router = express.Router();

// Get quiz by module ID
router.get("/:moduleId", async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ module: req.params.moduleId }).populate("module");
        if (!quiz) return res.status(404).json({ message: "Quiz not found for this module" });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit quiz and calculate score
router.post("/submit", async (req, res) => {
    try {
        const { userId, moduleId, quizId, answers } = req.body;

        // Validate input
        if (!userId || !moduleId || !quizId || !answers) {
            return res.status(400).json({ message: "Missing required fields: userId, moduleId, quizId, answers" });
        }

        // Get the quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        // Calculate score
        let correctCount = 0;
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctCount++;
            }
        });

        const score = (correctCount / quiz.questions.length) * 100;
        const totalQuestions = quiz.questions.length;

        // Store progress
        const progress = new Progress({
            user: userId,
            module: moduleId,
            quiz: quizId,
            score: Math.round(score),
            totalQuestions,
            completed: score >= 70 // Mark as completed if score is 70% or higher
        });

        const savedProgress = await progress.save();

        res.status(201).json({
            message: "Quiz submitted successfully",
            score: Math.round(score),
            totalQuestions,
            correctAnswers: correctCount,
            completed: score >= 70,
            progress: savedProgress
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user progress for a module
router.get("/progress/:userId/:moduleId", async (req, res) => {
    try {
        const progress = await Progress.find({
            user: req.params.userId,
            module: req.params.moduleId
        }).populate("quiz");

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
