"use client";

import { useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import NoteForm from "@/components/forms/NoteForm";
import NotesList from "@/components/notes/NotesList";

export default function Home() {
    const today = new Date().toISOString(); // Get today's date in YYYY-MM-DD format

    const [refreshKey, setRefreshKey] = useState(0); // Key ot check if notes list should be refreshed
    const [selectedDate, setSelectedDate] = useState(today); // Selected date in calendar, used to filter notes list

    // Detect if a note has been created and refresh notes list component's key
    const handleRefreshNotesList = () => {
        const key = Date.now();
        setRefreshKey(key);
    };

    const handleSelectedDay = (date: string) => {
        setSelectedDate(date);
        handleRefreshNotesList();
    }

    return (
        <div className="flex justify-center p-8 gap-4 h-screen overflow-hidden">
            <div className="flex flex-col w-1/3 gap-4 overflow-y-auto h-full">
                <NoteForm
                    onCreated={handleRefreshNotesList}
                    selectedDate={selectedDate}
                />
                <Calendar onSelectedDay={handleSelectedDay} />
            </div>
            <div className="flex flex-col w-2/3 overflow-y-auto h-full">
                <NotesList
                    refreshKey={refreshKey}
                    selectedDate={selectedDate}
                />
            </div>
        </div>
    );
}
