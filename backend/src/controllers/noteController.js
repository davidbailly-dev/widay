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
            const regex = new RegExp(search, 'i'); // Permit partial search

            notes = await Note
                .find({
                    $or: [
                        { $text: { $search: search } },
                        {
                            $or: [
                                { content: regex },
                                { tags: regex }
                            ]
                        }
                    ],
                    ...baseQuery
                })
                .sort({
                    score: { $meta: "textScore" },
                    createdAt: -1
                })
                .select({ score: { $meta: "textScore" } })
                .limit(Number(limit) || 20);
        } else {
            notes = await Note
                .find(baseQuery)
                .sort({ createdAt: -1 })
                .limit(Number(limit) || 20)
        }

        // Force delay for tests
        // await new Promise(resolve => setTimeout(resolve, 1500));

        res.json({
            success: true,
            message: 'Found notes',
            data: { notes}
        });
    } catch (err) {
        next(err);
    }
};

// Create a new note
exports.createNote = async (req, res, next) => {
    try {
        const { date, content, tags } = req.body;

        const note = new Note({
            date,
            content,
            tags
        });

        const saved = await note.save();

        // Force delay for tests
        // await new Promise(resolve => setTimeout(resolve, 1500));

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