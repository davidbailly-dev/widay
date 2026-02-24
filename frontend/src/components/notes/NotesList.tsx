'use client';

import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { NoteSearchInput } from '@/components/notes/NoteSearchInput';

import { useNotes } from '@/hooks/useNotes';
import { TagItem } from '@/components/tag/TagItem';

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
        <div className="flex flex-col w-full gap-4">
            <div>
                <NoteSearchInput />
            </div>
            <div>
                <ul className="flex flex-col gap-4 w-full overflow-y-scroll">
                    {notes.map((note) => (
                        <li key={note._id} className="grid gap-4 p-3 border-2 border-stone-800 rounded-lg">
                            <p>{note.date}</p>
                            {notes && note.tags.length > 0 && (
                                <span className="flex flex-wrap self-start gap-2">
                                {note.tags.map((tag) => (
                                    <TagItem key={tag} name={tag} />
                                ))}
                                </span>
                            )}
                            <p className="whitespace-pre-line">{note.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}