"use client";

import { useState } from "react";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import { NoteSearchInput } from "@/components/notes/NoteSearchInput";

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [search, setSearch] = useState('');

    // Detect if a note has been created and refresh notes list component's key
    const handleRefreshNotesList = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="flex w-full justify-center gap-4">
            <div className="flex w-1/2 gap-4">
                <NoteForm
                    onCreated={handleRefreshNotesList}
                />
            </div>
            <div className="flex flex-col w-1/2 gap-4">
                <NoteSearchInput
                    onChange={handleSearch}
                />
                <NotesList
                    refreshKey={refreshKey}
                    search={search}
                />
            </div>
        </div>
    );
}
