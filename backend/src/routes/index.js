const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Get all notes
router.get('/notes', noteController.getNotes);

// Create a new note
router.post('/notes', noteController.createNote);

// Delete a note
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;