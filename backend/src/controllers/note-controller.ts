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

type SortValue = 1 | -1 | { $meta: "textScore" };
type SortQuery = Record<string, SortValue>;

const RESULTS_LIMIT = 10;

// Create a new note (inchangé)
export const createNote = async (
    req: Request<unknown, unknown, CreateNoteBody>,
    res: Response,
    next: NextFunction
) => {
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

        let query: Record<string, unknown> = { ...baseQuery };
        let sort: SortQuery = { createdAt: -1, _id: -1 };
        let projection = "date content tags createdAt updatedAt";

        if (typeof search === "string" && search.trim().length >= 2) {
            query = {
                ...baseQuery,
                $text: { $search: search.trim() }
            };

            sort = {
                score: { $meta: "textScore" },
                createdAt: -1,
                _id: -1
            };

            projection = "date content tags createdAt updatedAt score";
        }

        const [notes, total] = await Promise.all([
            Note.find(query)
                .select(projection)
                .sort(sort)
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Note.countDocuments(query)
        ]);

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