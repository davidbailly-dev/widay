"use client";

import { useState } from "react";

import { CgSpinnerAlt } from "react-icons/cg";

import { NoteCard } from "@/components/notes/NoteCard";
import PaginationList from "@/components/ui/PaginationList";

import type { Note, Pagination } from "@/types";

interface NotesListProps {
    activePage: number,
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    loading: boolean,
    notes: Note[],
    pagination?: Pagination,
    refreshKey: number,
    search?: string,
    selectedNote?: Note,
    handleActivePage: (page: number) => void,
    refreshNotes: () => void,
    setSelectedNote: (note: Note | undefined) => void
};

export default function NotesList({
    activePage,
    loading,
    handleActivePage,
    notes,
    pagination,
    refreshNotes,
}: NotesListProps) {
    const [selectedNoteId, setSelectedNoteId] = useState<string>('');

    const handleSelectedNoteCard = (noteId: string | undefined) => {
        if (noteId) {
            setSelectedNoteId(noteId);
        }
    }

    // If notes data are loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinnerAlt className="animate-spin w-8 h-8 text-emerald-500" />
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
        <div className="space-y-4 w-full">
            <ul className="flex flex-col gap-4 w-full">
                {notes.map((note) => (
                    <NoteCard
                        key={note._id}
                        note={note}
                        isSelected={selectedNoteId == note._id ? true : false}
                        onClick={() => handleSelectedNoteCard(note._id)}
                        onDelete={refreshNotes}
                    />
                ))}
            </ul>
            <PaginationList
                className="flex justify-between w-full"
                activePage={activePage}
                onPageChange={handleActivePage}
                totalPages={pagination?.totalPages} />
        </div>
    );
}