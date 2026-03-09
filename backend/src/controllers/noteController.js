const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res, next) => {
    try {
        const { dateStart, dateEnd, limit, search } = req.query;
        const baseQuery = {};

        if (dateStart && dateEnd) {
            baseQuery.date = { $gte: dateStart, $lte: dateEnd };
        }

        let notes;

        if (search && search.length >= 2) {
            const regex = new RegExp(search, 'i');
            
            // Search text
            const textResults = await Note
                .find({ 
                    $text: { $search: search },
                    ...baseQuery 
                })
                .sort({ score: { $meta: "textScore" } })
                .select({ score: { $meta: "textScore" } })
                .limit(Number(limit) || 20);

            const textIds = textResults.map(n => n._id);

            // Search regex avoiding doublons (ignore previous text results)
            const regexResults = await Note
                .find({ 
                    $or: [
                        { content: regex },
                        { 'tags.label': regex }
                    ],
                    ...baseQuery,
                    _id: { $nin: textIds } // Avoid doublons
                })
                .sort({ createdAt: -1 })
                .limit(Number(limit) || 20);

            // Merge text and regex results
            notes = [...textResults, ...regexResults];
        } else {
            notes = await Note
                .find(baseQuery)
                .sort({ createdAt: -1 })
                .limit(Number(limit) || 20);
        }

        res.json({
            success: true,
            message: 'Found notes',
            data: { notes }
        });
    } catch (err) {
        next(err);
    }
};

// Create a new note (inchangé)
exports.createNote = async (req, res, next) => {
    try {
        const { date, content, tags } = req.body;

        const note = new Note({
            date,
            content,
            tags
        });

        const saved = await note.save();

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: { note: saved }
        });
    } catch (err) {
        next(err);
    }
};

// Delete a note (correction du message)
exports.deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Note.findOneAndDelete({ _id: id });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};