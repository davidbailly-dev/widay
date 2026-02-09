"use client";

import { useState } from "react";

import NoteForm from "@/components/forms/NoteForm";
import NotesList from "@/components/notes/NotesList";

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0); // Permet de savoir si la liste des notes a changé

    // Permet de détecter si une note a été créée et de rafraîchir la clé de la liste des notes
    const handleCreated = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    return (
        <div className="flex flex-col items-center justify-center m-auto md:w-1/2 sm:w-full p-8 gap-4">
            <NoteForm onCreated={handleCreated} />
            <NotesList refreshKey={refreshKey} />
        </div>
    );
}
