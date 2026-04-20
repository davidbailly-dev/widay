"use client";

import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

import { useNotes } from "@/hooks/useNotes";
import { NoteCard } from "@/components/notes/NoteCard";

import type { Note } from "@/types";

interface Props {
    refreshKey: number,
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    loading: boolean,
    notes: Note[],
    search?: string,
    selectedNote?: Note,
    setSelectedNote: (note: Note) => void
};

export default function NotesList({
    refreshKey,
    dateStart = '',
    dateEnd = '',
    limit = 10,
    loading,
    notes,
    search = '',
    selectedNote,
    setSelectedNote,
}: Props) {
    function handleSelectedNoteCard(note: Note) {
        setSelectedNote(note);
    }

    // If notes data are loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    // If no notes data found
    if (!notes || notes.length === 0) {
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
                    note={note}
                    selected={selectedNote?._id === note._id ? true : false}
                    onClick={() => handleSelectedNoteCard(note)}
                />
            ))}
        </ul>
    );
}