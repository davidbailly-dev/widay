'use client';

import { useEffect, useState, useRef } from "react";

import Button from "@/components/ui/Button";
import { Message, MessageType } from "@/components/ui/Message";
import TagInput from "@/components/ui/TagInput";
import Tags from "@/components/ui/Tags";
import TextArea from "@/components/ui/TextArea";

import { useNotes, NoteCreate } from "@/hooks/useNotes";

interface Props {
    selectedDate?: string;
    onCreated: (created: boolean) => void;
}

export default function NoteForm({ selectedDate, onCreated }: Props) {
    // Define now datetime
    const dtNow = new Date();
    dtNow.setMinutes(dtNow.getMinutes() - dtNow.getTimezoneOffset());
    const now = dtNow.toISOString().slice(0, 19);

    const { createNote } = useNotes();
    const [note, setNote] = useState<NoteCreate>({
        date: selectedDate || now,
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
            date: now,
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
            className="flex flex-col gap-4 bg-stone-900 border border-stone-800 rounded-lg p-4"
            onSubmit={handleSubmit}
        >
            <div>
                {/* note selected date : {note.date} */}
            </div>
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
            <Tags
                tags={note.tags || []}
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
        </form>
    );
}