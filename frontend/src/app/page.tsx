"use client";

import { useState } from "react";

import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NotesList";
import { NoteSearchInput } from "@/components/notes/NoteSearchInput";

export default function Home() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [selectedDate, setSelectedDate] = useState(today); // Selected date in calendar, used to filter notes list
    const [search, setSearch] = useState('');

    // Detect if a note has been created and refresh notes list component's key
    const handleRefreshNotesList = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    const handleSelectedDay = (date: string) => {
        setSelectedDate(date);
        handleRefreshNotesList();
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="flex w-full justify-center gap-4">
            <div className="flex w-1/2 gap-4">
                <NoteForm
                    onCreated={handleRefreshNotesList}
                    selectedDate={selectedDate}
                />
            </div>
            <div className="flex flex-col w-1/2 gap-4">
                <NoteSearchInput
                    onChange={handleSearch}
                />
                <NotesList
                    refreshKey={refreshKey}
                    dateStart={selectedDate}
                    search={search}
                />
            </div>
        </div>
    );
}
