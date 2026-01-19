import mongoose from "mongoose";
import User from "../models/User.js";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js";

mongoose.connect("mongodb://127.0.0.1:27017/signly");

const seedDB = async () => {
  await User.deleteMany();
  await Module.deleteMany();
  await Lesson.deleteMany();
  await Quiz.deleteMany();

  // -------- USER --------
  const user = await User.create({
    name: "Demo User",
    email: "demo@signly.com"
  });

  // -------- MODULES --------
  const modules = await Module.insertMany([
    {
      title: "Alphabet Module",
      description: "Learn ASL alphabets (A–Z)",
      level: "Beginner"
    },
    {
      title: "Number Module",
      description: "Learn numbers using sign language",
      level: "Beginner"
    },
    {
      title: "Common Words Module",
      description: "Frequently used words in ASL",
      level: "Intermediate"
    },
    {
      title: "Common Phrases Module",
      description: "Form basic conversations in ASL",
      level: "Intermediate"
    },
    {
      title: "Practice & Revision Module",
      description: "Comprehensive practice of all modules",
      level: "Advanced"
    }
  ]);

  const [
    alphabetModule,
    numberModule,
    wordsModule,
    phrasesModule,
    practiceModule
  ] = modules;

  // -------- LESSONS --------
  await Lesson.insertMany([
    // Module 1 – Alphabet
    {
      module: alphabetModule._id,
      title: "ASL Alphabets A–Z",
      content:
        "Learn hand signs for alphabets A to Z using visual demonstrations and explanations."
    },
    {
      module: alphabetModule._id,
      title: "Hand Positions & Movements",
      content:
        "Understand correct hand positions, finger placement, and movement for each alphabet."
    },

    // Module 2 – Numbers
    {
      module: numberModule._id,
      title: "Numbers 0–9",
      content:
        "Learn sign language numbers from 0 to 9 with visual examples."
    },
    {
      module: numberModule._id,
      title: "Basic Tens & Usage",
      content:
        "Learn basic tens and how numbers are used in daily communication."
    },

    // Module 3 – Common Words
    {
      module: wordsModule._id,
      title: "Daily Use Words",
      content:
        "Learn common words like hello, yes, no, sorry, and thank you."
    },
    {
      module: wordsModule._id,
      title: "Action & Emotion Words",
      content:
        "Learn action-based and emotion-based signs with meaning."
    },

    // Module 4 – Common Phrases
    {
      module: phrasesModule._id,
      title: "Greetings & Introductions",
      content:
        "Learn greetings, introductions, and polite expressions."
    },
    {
      module: phrasesModule._id,
      title: "Questions & Responses",
      content:
        "Learn common questions and how to respond using ASL."
    },

    // Module 5 – Practice & Revision
    {
      module: practiceModule._id,
      title: "Mixed Practice",
      content:
        "Practice alphabets, numbers, words, and phrases together."
    },
    {
      module: practiceModule._id,
      title: "Guided Revision & Error Correction",
      content:
        "Repetition-based learning with hints and corrections."
    }
  ]);

  // -------- QUIZZES --------
  await Quiz.insertMany([
    {
      module: alphabetModule._id,
      questions: [
        {
          question: "Identify the alphabet shown in the sign",
          options: ["A", "B", "C"],
          correctAnswer: 0
        }
      ]
    },
    {
      module: numberModule._id,
      questions: [
        {
          question: "Which number is shown in the sign?",
          options: ["3", "5", "7"],
          correctAnswer: 1
        }
      ]
    },
    {
      module: phrasesModule._id,
      questions: [
        {
          question: "Arrange signs to form a greeting phrase",
          options: ["Hello", "Thank you", "Sorry"],
          correctAnswer: 0
        }
      ]
    },
    {
      module: practiceModule._id,
      questions: [
        {
          question: "Mixed assessment: identify correct sign",
          options: ["Alphabet", "Number", "Word"],
          correctAnswer: 2
        }
      ]
    }
  ]);

  console.log("✅ All 5 modules seeded successfully");
  mongoose.connection.close();
};

seedDB();
