'use client';

import { useEffect, useState, useRef } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

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

    const { createNote } = useNotes();
    const [note, setNote] = useState<NoteCreate>({
        date: selectedDate || '',
        content: '',
        tags: [],
    });
    const [tagToAdd, setTagToAdd] = useState('');
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

    useEffect(() => {
        if (selectedDate) {
            setNote({...note, date: selectedDate});
        }
    }, [selectedDate]);

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

    function resetMessage() {
        setMessage({
            content: '',
            type: 'neutral',
            visible: false
        })
    }

    function resetNote() {
        setNote({
            date: selectedDate || '',
            content: '',
            tags: []
        });
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({
            content: '',
            type: 'success',
            visible: false
        })
        setNote({ ... note, content: e.target.value });
    }

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagToAdd(e.target.value.trim());
    }

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