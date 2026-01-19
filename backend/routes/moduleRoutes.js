import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

// Get all modules
router.get("/", async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single module
router.get("/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create module
router.post("/", async (req, res) => {
  const module = new Module({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update module
router.patch("/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });

    if (req.body.title) module.title = req.body.title;
    if (req.body.description) module.description = req.body.description;

    const updatedModule = await module.save();
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete module
router.delete("/:id", async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json({ message: "Module deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
