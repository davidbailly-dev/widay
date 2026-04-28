"use client";

import { useEffect, useState } from "react";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import NoteSearchInput from "@/components/notes/NoteSearchInput";
import ToolBar from "@/components/toolbar/ToolBar";
import { useNotes } from "@/hooks/useNotes";

const MIN_SEARCH_LENGTH = 3;

export default function Home() {
    const { notes, getNotes, loading, selectedNote, setSelectedNote } = useNotes();
    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [search, setSearch] = useState('');

    // Fetch notes
    useEffect(() => {
        if (search.length >= MIN_SEARCH_LENGTH) {
            getNotes('', '', 10, search);
        } else {
            getNotes('', '', 10, '');
        }
    }, [getNotes, refreshKey, search]);

    // Detect if a note has been created and refresh notes list component's key
    const handleRefreshNotesList = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    return (
        <div className="w-full">
            <div className="sticky top-0">
                <ToolBar>
                    <NoteSearchInput
                        value={search}
                        onChange={setSearch}
                    />
                </ToolBar>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-center gap-4 p-6">
                <div className="flex flex-2 gap-4">
                    <NoteForm
                        triggerRefresh={handleRefreshNotesList}
                        selectedNote={selectedNote}
                    />
                </div>
                <div className="flex flex-3 flex-col gap-4 w-full">
                    <NotesList
                        loading={loading}
                        notes={notes}
                        refreshKey={refreshKey}
                        search={search}
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                    />
                </div>
            </div>
        </div>
    );
}
