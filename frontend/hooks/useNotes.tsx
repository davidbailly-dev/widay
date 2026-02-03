import { noteService } from '@/lib/api/note.service';
import { use } from 'react';

export interface Notes {
    date: string,
    notes: Note[]
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
}

export interface CreateNote {
    title: string;
    content: string;
    date: string;
    tags: string[];
}

export const useNotes = () => {
    const getAllNotes = async () => {
        try {
            const notes = await noteService.getAll();
            return notes.data.notes;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    };

    const createNote = async (data: CreateNote) => {
        try {
            const newNote = await noteService.create(data);
            return newNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    };

    return {
        getAllNotes,
        createNote,
    };
};