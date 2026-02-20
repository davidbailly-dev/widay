"use client";

import NoteForm from "@/components/forms/NoteForm";

export default function AddPage() {
    const handleOnCreated = () => {
        return true;
    };

    return (
        <div className="flex w-full justify-center">
            <NoteForm
                selectedDate="2026-01-01"
                onCreated={handleOnCreated}
            />
        </div>
    );
}