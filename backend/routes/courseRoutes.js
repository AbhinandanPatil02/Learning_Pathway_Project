import express from "express";
import Pathway from "../models/Pathway.js"; // Assuming you have a Pathway model
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// 🔹 Save a Pathway
router.post("/save", authMiddleware, async (req, res) => {
    try {
        const { technology, pathway } = req.body;

        // Create a new pathway entry
        const newPathway = new Pathway({
            userId: req.user.id,  // User creating the pathway
            technology,
            pathway, // Save the pathway (assumed to be an object or structured data)
        });

        await newPathway.save();

        res.status(201).json({ message: "Pathway saved successfully", pathway: newPathway });
    } catch (error) {
        res.status(500).json({ error: "Failed to save pathway" });
    }
});

// 🔹 Get Pathways for a User
router.get("/", authMiddleware, async (req, res) => {
    try {
        // Fetch all pathways for the current user
        const pathways = await Pathway.find({ userId: req.user.id });

        if (!pathways || pathways.length === 0) {
            return res.status(404).json({ message: "No pathways found for this user" });
        }

        res.json(pathways);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pathways" });
    }
});

// 🔹 Update Pathway
router.put("/:pathwayId", authMiddleware, async (req, res) => {
    try {
        const { pathwayId } = req.params;
        const { pathway, progress } = req.body;

        // Find and update the pathway
        const updatedPathway = await Pathway.findOneAndUpdate(
            { _id: pathwayId, userId: req.user.id }, // Ensure it's the correct user
            { pathway, progress },  // Update the pathway and progress
            { new: true }
        );

        if (!updatedPathway) return res.status(404).json({ message: "Pathway not found" });

        res.json({ message: "Pathway updated", pathway: updatedPathway });
    } catch (error) {
        res.status(500).json({ error: "Failed to update pathway" });
    }
});

// 🔹 Delete a Pathway
router.delete("/:pathwayId", authMiddleware, async (req, res) => {
    try {
        const { pathwayId } = req.params;

        // Find and delete the pathway
        const deletedPathway = await Pathway.findOneAndDelete({
            _id: pathwayId,
            userId: req.user.id,  // Ensure it's the correct user
        });

        if (!deletedPathway) return res.status(404).json({ message: "Pathway not found" });

        res.json({ message: "Pathway deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete pathway" });
    }
});

export default router;

