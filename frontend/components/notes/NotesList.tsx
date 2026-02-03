"use client";

import { useEffect, useState } from "react";
import { useNotes, Note, Notes } from "@/hooks/useNotes";

export default function NotesList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const { getAllNotes } = useNotes();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await getAllNotes();
                setNotes(fetchedNotes);
            } catch (error) {
                console.error("Erreur lors de la récupération des notes:", error);
            }
        };

        fetchNotes();
        setLoading(false);
    }, []);

    if (loading) return <p>Chargement des notes...</p>;

    if (notes.length === 0) return <p>Aucune note disponible.</p>;

    console.log("Notes fetched:", notes);

    return (
        <ul className="w-full space-y-4">
            {notes.map((note) => (
                <li key={note._id} className="flex flex-col gap-4 border-3 border-stone-800 p-4 rounded-lg">
                    <p>{note.date}</p>
                    <p>{note.title}</p>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    );
}