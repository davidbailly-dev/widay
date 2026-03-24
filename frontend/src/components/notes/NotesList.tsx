"use client";

import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

import { useNotes } from "@/hooks/useNotes";
import { NoteCard } from "@/components/notes/NoteCard";

interface Props {
    refreshKey: number,
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    search?: string
};

export default function NotesList({
    refreshKey,
    dateStart = '',
    dateEnd = '',
    limit = 10,
    search = ''
}: Props) {
    const { notes, getNotes, loading } = useNotes();

    // Fetch requested notes
    useEffect(() => {
        let validatedSearch = '';

        if (search.length >= 2) {
            validatedSearch = search;
        }

        getNotes(dateStart, dateEnd, limit, validatedSearch);
    }, [dateStart, dateEnd, getNotes, limit, refreshKey, search]);

    // If notes data are loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    // If no notes data found
    if (notes.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-stone-500">No notes found for this date.</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {notes.map((note) => (
                <NoteCard
                    key={note._id}
                    _id={note._id}
                    date={note.date}
                    content={note.content}
                    tags={note.tags}
                />
            ))}
        </ul>
    );
}