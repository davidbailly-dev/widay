"use client";

import { useEffect, useState } from "react";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import NoteSearchInput from "@/components/notes/NoteSearchInput";
import ToolBar from "@/components/toolbar/ToolBar";
import { useNotes } from "@/hooks/useNotes";

const MIN_SEARCH_LENGTH = 3;

export default function Home() {
    const { notes, getNotes, loading, loadingMore, selectedNote, setSelectedNote, pagination } = useNotes();
    const [activePage, setActivePage] = useState(pagination?.page || 1);
    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [search, setSearch] = useState('');

    // Fetch notes
    useEffect(() => {
        if (search.length >= MIN_SEARCH_LENGTH) {
            getNotes('', '', 5, search, activePage, true);
        } else {
            getNotes('', '', 5, '', activePage, true);
        }
    }, [getNotes, refreshKey, search, activePage]);

    // Handle notes page selected by user
    function handleActivePage(page: number) {
        setActivePage(page);
        const key = Date.now();
        setRefreshKey(key);
    }

    // Load more notes to display
    const handleLoadMorenotes = () => {
        if (pagination && activePage + 1 <= pagination.totalPages) {
            const nextPageToLoad = activePage + 1; 
            setActivePage(nextPageToLoad);
            const key = Date.now();
            setRefreshKey(key);
        }
    }

    // Detect if a note has been created and refresh notes list component's key
    const handleRefreshNotesList = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    const today = new Date().toISOString().split('T')[0];

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
                    today={today}
                    triggerRefresh={handleRefreshNotesList}
                />
                <NotesList
                    activePage={activePage}
                    handleActivePage={handleActivePage}
                    loading={loading}
                    loadingMore={loadingMore}
                    loadMoreNotes={handleLoadMorenotes}
                    notes={notes}
                    pagination={pagination}
                    refreshKey={refreshKey}
                    refreshNotes={handleRefreshNotesList}
                    search={search}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                />
            </div>
        </div>
    );
}
