import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note-controller";
import { getHealth } from "../controllers/health-controller";

const router = express.Router();

// Health
router.get('/health', getHealth);

// Get all notes
router.get('/notes', getNotes);

// Create a new note
router.post('/notes', createNote);

// Delete a note
router.delete('/notes/:id', deleteNote);

// Update a note
router.patch('/notes/:id', updateNote);

export default router;