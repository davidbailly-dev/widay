'use client';

import { useEffect, useState } from "react";
import { useNotes, Note } from "@/hooks/useNotes";

interface Props {
    refreshKey: number
};

export default function NotesList({ refreshKey }: Props) {
    const { notes, getAllNotes } = useNotes();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllNotes();
    }, []);

    useEffect(() => {
        getAllNotes();
    }, [refreshKey]);

    // if (loading) return <p>Chargement des notes...</p>;

    return (
        <ul className="w-full space-y-4">
            {notes.map((note) => (
                <li key={note._id} className="flex flex-col gap-4 border-2 border-stone-800 p-4 rounded-lg">
                    <p>{note.date}</p>
                    <p className="whitespace-pre-line">{note.content}</p>
                </li>
            ))}
        </ul>
    );
}