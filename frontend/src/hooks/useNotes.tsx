import { Note } from '@/types';

import { noteService } from '@/services/api/note.service';
import { useState } from 'react';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const getNotes = async (dateStart?: string, dateEnd?: string, limit?: number, search?: string) => {
        try {
            setLoading(true);
            const notes = await noteService.get(dateStart, dateEnd, limit, search);
            setNotes(notes.data.notes);

            return notes.data.notes;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createNote = async (data: Note) => {
        try {
            const newNote = await noteService.create(data);
            await getNotes();
            
            return newNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    };

    return {
        notes,
        loading,
        getNotes,
        createNote,
    };
};