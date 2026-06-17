"use client";

import { CgSpinner } from "react-icons/cg";

import { NoteCard } from "@/components/notes/NoteCard";
import PaginationList from "@/components/ui/PaginationList";

import type { Note, Pagination } from "@/types";

interface Props {
    refreshKey: number,
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    loading: boolean,
    notes: Note[],
    pagination?: Pagination,
    search?: string,
    selectedNote?: Note,
    setSelectedNote: (note: Note | undefined) => void
};

export default function NotesList({
    loading,
    notes,
    pagination,
    selectedNote,
    setSelectedNote,
}: Props) {
    function handleSelectedNoteCard(note: Note) {
        setSelectedNote(note === selectedNote ? undefined : note);
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
        <div>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {notes.map((note) => (
                    <NoteCard
                        key={note._id}
                        note={note}
                        isSelected={selectedNote?._id === note._id ? true : false}
                        onClick={() => handleSelectedNoteCard(note)}
                    />
                ))}
            </ul>
            <PaginationList activePage={pagination?.page} totalPages={pagination?.totalPages} />
        </div>
    );
}