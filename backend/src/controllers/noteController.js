const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({});

        res.json({
            success: true,
            message: 'Found notes',
            data: {
                notes
            }
        })
    } catch (err) {
        next(err);
    }
};

// Create a new note
exports.createNote = async (req, res, next) => {
    try {
        const { date, title, content, tags } = req.body;

        const note = new Note({
            date,
            title,
            content,
            tags
        });

        const saved = await note.save();

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: {
                note
            }
        });
    } catch (err) {
        next(err);
    }
}

// Delete a note
exports.deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Note.findOneAndDelete( { _id: id } );

        if (!result) {
            res.status(404).json({
                success: false,
                message: 'DEV : not found note to delete',
            });
        }

        res.status(200).json({
            success: true,
            message: 'DEV : found note to delete, not deleted'
        });
    } catch (err) {
        next(err);
    }
};