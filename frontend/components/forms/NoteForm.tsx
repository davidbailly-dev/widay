'use client';

import { useEffect, useState } from "react";

import DateInput from "@/components/ui/DateInput";
import TagInput from "@/components/ui/TagInput";
import Tags from "@/components/ui/Tags";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

import { useNotes, NoteCreate } from "@/hooks/useNotes";
import { userAgentFromString } from "next/server";

interface Props {
    onCreated: (created: boolean) => void;
}

export default function NoteForm({ onCreated }: Props) {
    const today = new Date().toISOString().split('T')[0];

    const { createNote } = useNotes();
    const [note, setNote] = useState<NoteCreate>({
        date: today,
        content: '',
        tags: [],
    });
    const [tagToAdd, setTagToAdd] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log(note.tags);
    }, [note]);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);

        try {
            const res = await createNote(note);
            
            if (res.success) {
                setSuccess(true);
                onCreated(true);
            }
        } catch (error) {
            console.error('Error submiting note to create : ', error);
        } finally {
            setLoading(false);
        }
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSuccess(false);
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
            <Tags
                tags={note.tags || []}
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
            <Button
                type="submit"
                label="Ajouter"
                disabled={loading}
                success={success}
            />
        </form>
    );
}