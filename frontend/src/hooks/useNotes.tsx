import { Note, Pagination } from '@/types';

import { useCallback, useState } from 'react';
import { noteService } from '@/services/api/note.service';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | undefined>();

    const getNotes = useCallback(async (dateStart?: string, dateEnd?: string, limit?: number, search?: string, page?: number, append?: boolean) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const notes = await noteService.get(dateStart, dateEnd, limit, search, page);
            
            if (append) {
                setNotes(prev => [
                    ...prev,
                    ...(notes.data?.notes || [])
                ]);
            } else {
                setNotes(notes.data?.notes || []);
            }

            setPagination(notes.data?.pagination);

            return notes.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    const createNote = async (data: Note) => {
        try {
            const newNote = await noteService.create(data);
            
            return newNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    };

    const deleteNote = async (id: string) => {
        try {
            const result = await noteService.delete(id);

            return result;
        } catch (error) {
            const res = {
                success: false,
                message: 'Error deleting note: ' + error
            }

            return res;

            // console.error('Error deleting note:', error);
            // throw error;
        }
    }

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
        loadingMore,
        getNotes,
        createNote,
        deleteNote,
        updateNote,
        selectedNote,
        setSelectedNote
    };
};