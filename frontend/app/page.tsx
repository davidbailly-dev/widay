"use client";

import { useState } from "react";

import Calendar from "@/components/calendar/Calendar";
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
        <div className="flex justify-center p-8 gap-4 h-screen overflow-hidden">
            <div className="flex flex-col w-1/3 gap-4 overflow-y-auto h-full">
                <NoteForm onCreated={handleCreated} />
                <Calendar className="" />
            </div>
            <div className="flex flex-col w-2/3 overflow-y-auto h-full">
                <NotesList refreshKey={refreshKey} />
            </div>
        </div>
    );
}
