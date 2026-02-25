"use client";

import { useEffect, useState, useRef } from "react";

import { MessageType, NoteCreate } from "@/types";
import Button from "@/components/ui/Button";
import { Message } from "@/components/ui/Message";
import TagInput from "@/components/tag/TagInput";
import { TagItem } from '@/components/tag/TagItem';
import TextArea from "@/components/ui/TextArea";

import { useNotes } from "@/hooks/useNotes";

interface Props {
    selectedDate?: string;
    onCreated: (created: boolean) => void;
}

export default function NoteForm({ selectedDate, onCreated }: Props) {
    // Define now datetime
    const dtNow = new Date();
    dtNow.setMinutes(dtNow.getMinutes() - dtNow.getTimezoneOffset());

    // Function that push request to note backend API
    const { createNote } = useNotes();

    // Note to be added
    const [note, setNote] = useState<NoteCreate>({
        date: selectedDate || '',
        content: '',
        tags: [],
    });

    // The tag that the user is inputing before adding it
    const [tagToAdd, setTagToAdd] = useState('');

    // Message content
    const [message, setMessage] = useState<MessageType>({
        content: '',
        type: 'neutral',
        visible: false
    });
    
    const [loading, setLoading] = useState(false);

    // Used to focus to input after submiting a note
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Focus on input content when note created with success
    useEffect(() => {
        if (message.type == 'success') {
            inputRef.current?.focus();
        }
    }, [message]);

    // Set the note date when it changes
    useEffect(() => {
        if (selectedDate) {
            setNote({...note, date: selectedDate});
        }
    }, [selectedDate]);

    // Handle the form submit to create the note request to API
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        resetMessage();

        try {
            const res = await createNote(note);
            
            if (res.success) {
                setMessage({
                    content: 'Note ajoutée avec succès !',
                    type: 'success',
                    visible: true
                });
                resetNote();
                onCreated(true);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            
            setMessage({
                content: message,
                type: 'error',
                visible: true
            });
            // console.error('Error submiting note to create : ', err);
        } finally {
            setLoading(false);
        }
    }

    // Reset info message for user
    function resetMessage() {
        setMessage({
            content: '',
            type: 'neutral',
            visible: false
        })
    }

    // Reset note fields
    function resetNote() {
        setNote({
            date: selectedDate || '',
            content: '',
            tags: []
        });
    }

    // Reset info message and handle note content changes
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({
            content: '',
            type: 'success',
            visible: false
        })
        setNote({ ... note, content: e.target.value });
    }

    // Set the current tag that the user is typing
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagToAdd(e.target.value.trim());
    }

    // Add the tag to the note tags list
    const handleTagInputClick = () => {
        if (tagToAdd) {
            setNote({ ...note, tags: [...(note.tags || []), tagToAdd] });
            setTagToAdd('');
        }
    }

    return (
        <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
        >
            {note.tags && note.tags.length > 0 && (
            <span className="flex gap-2">
            {note.tags?.map((tag) => (
                <TagItem key={tag} name={tag} />
            ))}
            </span>
            )}
            <TextArea
                value={note.content}
                inputRef={inputRef}
                onChange={(e) => {handleContentChange(e)}}
            />
            <TagInput
                value={tagToAdd}
                onChange={handleTagInputChange}
                onClick={handleTagInputClick}
            />
            <Button
                type="submit"
                label="Ajouter"
                disabled={loading}
            />
            <Message
                content={message.content}
                type={message.type}
                visible={message.visible}
            />
            <div>{selectedDate}</div>
        </form>
    );
}