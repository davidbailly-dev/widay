import express from "express";
import { createNote, deleteNote, getNotes } from "../controllers/note-controller";

const router = express.Router();

// Get all notes
router.get('/notes', getNotes);

// Create a new note
router.post('/notes', createNote);

// Delete a note
router.delete('/notes/:id', deleteNote);

export default router;