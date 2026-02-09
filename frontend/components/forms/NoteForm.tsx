'use client';

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import DateInput from "@/components/ui/DateInput";
import { Message, MessageType } from "@/components/ui/Message";
import TagInput from "@/components/ui/TagInput";
import Tags from "@/components/ui/Tags";
import TextArea from "@/components/ui/TextArea";

import { useNotes, NoteCreate } from "@/hooks/useNotes";
import { userAgentFromString } from "next/server";
import { JSONValue } from "next/dist/server/config-shared";

interface Props {
    onCreated: (created: boolean) => void;
}

export default function NoteForm({ onCreated }: Props) {
    // Define now datetime
    const dtNow = new Date();
    dtNow.setMinutes(dtNow.getMinutes() - dtNow.getTimezoneOffset());
    const now = dtNow.toISOString().slice(0, 19);

    const { createNote } = useNotes();
    const [note, setNote] = useState<NoteCreate>({
        date: now,
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
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
        >
            <DateInput
                value={note.date}
                onChange={(e) => setNote({...note, date: e.target.value})}
            />
            <TextArea
                value={note.content}
                onChange={(e) => handleContentChange(e)}
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