import type { NextFunction, Request, Response } from "express";

import Note from "../models/note";

import type { Tag } from "../types/note";

interface CreateNoteBody {
    date: string,
    content: string,
    tags: Tag[]
}

interface GetNotesQuery {
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    page?: number,
    search?: string,
};

const RESULTS_LIMIT = 10;

// Create a new note (inchangé)
export const createNote = async (
    req: Request<unknown, unknown, CreateNoteBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { date, content, tags } = req.body;
        const noteDate = typeof date === "string" && date.trim() !== "" ? date : new Date().toISOString().split("T")[0];

        const note = new Note({
            date: noteDate,
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

// Delete a note
export const deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

// Get all notes
export const getNotes = async (
    req: Request<unknown, unknown, unknown, GetNotesQuery>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { dateStart, dateEnd, limit, page, search } = req.query;

        const pageNumber = Math.max(Number(page || 1), 1);
        const limitNumber = Math.max(Number(limit) || RESULTS_LIMIT, 1);
        const skip = (pageNumber - 1) * limitNumber;

        const baseQuery: Record<string, unknown> = {};

        if (dateStart && dateEnd) {
            baseQuery.date = { $gte: dateStart, $lte: dateEnd };
        }

        let notes = [];
        let total = 0;

        if (typeof search === "string" && search.trim().length >= 2) {
            const words = search
                .trim()
                .split(/\s+/)
                .filter(word => word.length >= 2);

            const normalizedSearch = words.join(" ");

            const textResults = await Note.find({
                ...baseQuery,
                $text: { $search: normalizedSearch }
            })
                .select({
                    date: 1,
                    content: 1,
                    tags: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    score: { $meta: "textScore" }
                })
                .sort({
                    score: { $meta: "textScore" },
                    createdAt: -1,
                    _id: -1
                })
                .lean();

            const textIds = textResults.map(note => note._id)

            const regexConditions = words.flatMap(word => [
                { content: { $regex: word, $options: "i" } },
                { "tags.label": { $regex: word, $options: "i" } }
            ]);

            const regexResults = await Note.find({
                ...baseQuery,
                _id: { $nin: textIds },
                $or: regexConditions
            })
                .select("date content tags createdAt updatedAt")
                .sort({ createdAt: -1, _id: -1 })
                .lean();

            const merged = [...textResults, ...regexResults];

            total = merged.length;
            notes = merged.slice(skip, skip + limitNumber);
        } else {
            total = await Note.countDocuments(baseQuery);

            notes = await Note.find(baseQuery)
                .select("date content tags createdAt updatedAt")
                .sort({ createdAt: -1, _id: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean();
        }

        res.json({
            success: true,
            message: "Found notes",
            data: {
                notes,
                pagination: {
                    page: pageNumber,
                    limit: limitNumber,
                    total,
                    totalPages: Math.ceil(total / limitNumber),
                    hasPrevPage: pageNumber > 1,
                    hasNextPage: pageNumber * limitNumber < total
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Update a note
 */
export const updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { date, content, tags } = req.body;
        const updated = await Note.findByIdAndUpdate(
            id,
            {
                ...(date !== undefined && { date }),
                ...(content !== undefined &&  { content }),
                ...(tags !== undefined && { tags }),
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                code: "NOTE_NOT_FOUND",
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated sucessfully",
            data: { note: updated },
        });
    } catch (err) {
        next(err);
    }
};