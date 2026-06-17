import { Note, Pagination } from '@/types';

import { noteService } from '@/services/api/note.service';
import { useCallback, useState } from 'react';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>();

    const getNotes = useCallback(async (dateStart?: string, dateEnd?: string, limit?: number, search?: string) => {
        try {
            setLoading(true);

            const notes = await noteService.get(dateStart, dateEnd, limit, search);
            
            setNotes(notes.data.notes);
            setPagination(notes.data.pagination);

            return notes.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

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

    const updateNote = async (id: string, data: Note) => {
        try {
            const note = await noteService.update(id, data);

            await getNotes();

            return note;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }

    return {
        notes,
        pagination,
        loading,
        getNotes,
        createNote,
        updateNote,
        selectedNote,
        setSelectedNote
    };
};