'use client';

import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { useNotes } from '@/hooks/useNotes';
import Tags from '@/components/ui/Tags';

interface Props {
    refreshKey: number,
    selectedDate?: string,
};

export default function NotesList({
    refreshKey,
    selectedDate = ''
}: Props) {
    const { notes, getNotes, loading } = useNotes();

    useEffect(() => {
        getNotes(selectedDate);
        console.log('refreshing notes list with date', selectedDate);
    }, [refreshKey]);

    function convertToLocalTime(dateUTC: string) {
        const dt = new Date(dateUTC);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

        const formated = dt.toISOString().slice(0, 19).replace('T', ' ');

        return formated;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-stone-500">No notes found for this date.</p>
            </div>
        );
    }

    return (
        <ul className="space-y-4">
            {notes.map((note) => (
                <li key={note._id} className="flex flex-col gap-4 border-2 border-stone-800 p-4 rounded-lg">
                    <p>{convertToLocalTime(note.date)}</p>
                    <p className="whitespace-pre-line">{note.content}</p>
                    <Tags tags={note.tags} />
                </li>
            ))}
        </ul>
    );
}