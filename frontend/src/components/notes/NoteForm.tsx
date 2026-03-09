"use client";

import { useEffect, useState, useRef } from "react";

import { MessageType, Note } from "@/types";
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import Message from "@/components/ui/Message";
import TagInput from "@/components/tag/TagInput";
import TagItem from '@/components/tag/TagItem';
import TextArea from "@/components/ui/TextArea";

import { useNotes } from "@/hooks/useNotes";
import { getISODate } from "@/utils/date";

const TAGS_LIMIT_PER_NOTE = 5;

interface Props {
    className?: string;
    onCreated: (created: boolean) => void;
}

export default function NoteForm({ className, onCreated }: Props) {
    const [tagToAdd, setTagToAdd] = useState(''); // The tag that the user is inputing before adding it

    // Define now datetime
    const today = new Date();
    const defaultDate = getISODate(today);

    const [selectedDate, setSelectedDate] = useState(defaultDate); // The date of the note to create

    // Function that push request to note backend API
    const { createNote } = useNotes();

    // Note to be added
    const [note, setNote] = useState<Note>({
        date: selectedDate,
        content: '',
        tags: [],
    });

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

    const handleDeleteTag = (key: string) => {
        setNote({
            ...note,
            tags: note.tags?.filter((tag) => tag.key !== key)
        });
    }

    // Set the current tag that the user is typing
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagToAdd(e.target.value.trim());
    }

    // Add the tag to the note tags list
    const handleTagInputClick = () => {
        const countTagsAdded = note.tags?.length || 0;

        // Limits the number of tags for a note
        if (countTagsAdded >= TAGS_LIMIT_PER_NOTE) {
            return;
        }

        const tagKey = crypto.randomUUID();

        if (tagToAdd) {
            // Add the tag to the note tags
            setNote({
                ...note,
                tags: [
                    ...(note.tags),
                    {
                        key: tagKey,
                        label: tagToAdd
                    }
                ]});
            setTagToAdd('');
        }
    }

    const handleNoteFormDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    }

    return (
        <form
            className={`flex flex-col gap-4 w-full ${className}`}
            onSubmit={handleSubmit}
        >
            {note.tags && note.tags.length > 0 && (
            <span className="flex gap-2">
            {note.tags?.map((tag) => (
                <TagItem
                    key={tag.key}
                    name={tag.label}
                    onClick={(e) => {
                        handleDeleteTag(tag.key);
                    }} />
            ))}
            </span>
            )}
            <TextArea
                value={note.content}
                inputRef={inputRef}
                onChange={(e) => {handleContentChange(e)}}
            />
            <span className="flex flex-row gap-4 w-full">
                <InputDate
                    className="flex-1"
                    value={selectedDate}
                    onChange={handleNoteFormDateChange}
                />
                <TagInput
                    className="flex-2"
                    value={tagToAdd}
                    onChange={handleTagInputChange}
                    onClick={handleTagInputClick}
                />
            </span>
            <Button
                type="submit"
                label="Créer la note"
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