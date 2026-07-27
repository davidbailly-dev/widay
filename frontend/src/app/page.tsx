"use client";

import { useEffect, useState } from "react";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import NoteSearchInput from "@/components/notes/NoteSearchInput";
import ToolBar from "@/components/toolbar/ToolBar";
import { useNotes } from "@/hooks/useNotes";

const MIN_SEARCH_LENGTH = 3;

export default function Home() {
    const { notes, getNotes, loading, selectedNote, setSelectedNote, pagination } = useNotes();
    const [activePage, setActivePage] = useState(pagination?.page || 1);
    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [search, setSearch] = useState('');

    // Fetch notes
    useEffect(() => {
        if (search.length >= MIN_SEARCH_LENGTH) {
            getNotes('', '', 10, search, activePage);
        } else {
            getNotes('', '', 10, '', activePage);
        }
    }, [getNotes, refreshKey, search, activePage]);

    // Handle notes page selected by user
    function handleActivePage(page: number) {
        setActivePage(page);
        const key = Date.now();
        setRefreshKey(key);
    }

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
            <div className="flex flex-col w-full lg:w-2/3 p-6 gap-6 m-auto">
                <NoteForm
                    key={selectedNote?._id ?? 'new'}
                    triggerRefresh={handleRefreshNotesList}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                />
                <NotesList
                    activePage={activePage}
                    handleActivePage={handleActivePage}
                    loading={loading}
                    notes={notes}
                    pagination={pagination}
                    refreshKey={refreshKey}
                    search={search}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                />
            </div>
        </div>
    );
}
