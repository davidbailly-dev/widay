"use client";

import { useEffect, useState, useRef } from "react";

import { MessageType, Note } from "@/types";
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import Message from "@/components/ui/Message";
import TagInput from "@/components/tag/TagInput";
import { TagItem } from '@/components/tag/TagItem';
import TextArea from "@/components/ui/TextArea";

import { useNotes } from "@/hooks/useNotes";
import { getISODate } from "@/utils/date";

const TAGS_LIMIT_PER_NOTE = 5;

interface Props {
    className?: string;
    selectedNote?: Note,
    editMode?: 'add' | 'update',
    onCreated: (created: boolean) => void;
}

export default function NoteForm({
    className,
    onCreated,
    editMode = 'add',
    selectedNote
}: Props) {
    const [tagToAdd, setTagToAdd] = useState(''); // The tag that the user is inputing before adding it
    const [disabledTagInput, setDisabledTagInput] = useState(false);

    // Define now datetime
    const today = new Date();
    const defaultDate = getISODate(today);

    const [selectedDate, setSelectedDate] = useState(defaultDate); // The date of the note to create

    // Function that push request to note backend API
    const { createNote, updateNote } = useNotes();

    // Set selected note or empty note
    const [note, setNote] = useState<Note>(selectedNote || {
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
        if (!selectedDate) return;

        setNote((prev) =>
            prev.date === selectedDate ? prev : {...prev, date: selectedDate}
        );
    }, [selectedDate]);

    useEffect(() => {
        if (!selectedNote) return;

        setNote(selectedNote);
    }, [selectedNote]);

    // Handle the form submit to create the note request to API
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        resetMessage();

        try {
            if (editMode == 'update' && !note._id) {
                throw new Error("Impossible de modifier une note sans identifiant.");
            }

            const res = editMode == 'add' ? await createNote(note) : await updateNote(note._id!, note);

            if (!res) {
                throw new Error("La requête de mise à jour a échoué.");
            }

            if (res.success) {
                setMessage({
                    content: editMode == 'add' ? "Note ajoutée avec succès !" : "Note modifiée avec succès !",
                    type: 'success',
                    visible: true
                });

                if (editMode == 'add') {
                    onCreated(true);
                    resetNote();
                }
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

        const countTagsAdded = note.tags?.length || 0;

        if (countTagsAdded <= TAGS_LIMIT_PER_NOTE) {
            setDisabledTagInput(false);
        }
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
            setDisabledTagInput(true);
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

            if (countTagsAdded + 1 >= TAGS_LIMIT_PER_NOTE) {
                setDisabledTagInput(true);
            }
        }
    }

    const handleNoteFormDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    }

    const handleResetNote = () => {
        resetNote();
        setMessage({
            content: "",
            type: "neutral",
            visible: false
        });
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
                    onClick={() => {
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
                    value={note.date ? note.date : selectedDate}
                    onChange={handleNoteFormDateChange}
                />
                <TagInput
                    className="flex-2"
                    value={tagToAdd}
                    disabled={disabledTagInput}
                    onChange={handleTagInputChange}
                    onClick={handleTagInputClick}
                />
            </span>
            <span className="flex gap-4">
                <Button
                    className="flex-1"
                    type="submit"
                    label={editMode == 'add' ? "Ajouter" : "Modifier"}
                    disabled={loading}
                />
                <Button
                    className="flex-1"
                    secondary={true}
                    type="button"
                    label="Annuler"
                    onClick={handleResetNote}
                />
            </span>
            <Message
                content={message.content}
                type={message.type}
                visible={message.visible}
            />
        </form>
    );
}