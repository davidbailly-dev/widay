'use client';

import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { NoteSearchInput } from '@/components/notes/NoteSearchInput';

import { useNotes } from '@/hooks/useNotes';
import TagItem from '@/components/tag/TagItem';

interface Props {
    refreshKey: number,
    dateStart?: string,
    dateEnd?: string,
    limit?: number,
    search?: string
};

export default function NotesList({
    refreshKey,
    dateStart = '',
    dateEnd = '',
    limit = 10,
    search = ''
}: Props) {
    const { notes, getNotes, loading } = useNotes();

    // Fetch requested notes
    useEffect(() => {
        let validatedSearch = '';

        if (search.length >= 2) {
            validatedSearch = search;
        }

        getNotes(dateStart, dateEnd, limit, validatedSearch);
    }, [refreshKey, search]);

    // If notes data are loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin w-8 h-8 text-blue-500" />
            </div>
        );
    }

    // If no notes data found
    if (notes.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-stone-500">No notes found for this date.</p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
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
    );
}