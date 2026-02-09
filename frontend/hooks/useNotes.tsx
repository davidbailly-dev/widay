import { noteService } from '@/lib/api/note.service';
import { get } from 'node:http';
import { useState } from 'react';

export interface Note {
    _id: string,
    content: string,
    date: string,
    tags: string[],
}

export interface NoteCreate {
    content: string,
    date: string,
    tags?: string[],
}

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    const getAllNotes = async () => {
        try {
            const notes = await noteService.getAll();
            setNotes(notes.data.notes);

            return notes.data.notes;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    };

    const createNote = async (data: NoteCreate) => {
        try {
            const newNote = await noteService.create(data);
            await getAllNotes();
            
            return newNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    };

    return {
        notes,
        getAllNotes,
        createNote,
    };
};