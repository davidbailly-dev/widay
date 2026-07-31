"use client";

import { useEffect, useState, useRef } from "react";

// Types
import { MessageType, Note, Tag } from "@/types";

// Components
import Button from "@/components/ui/Button";
import InputDate from "@/components/ui/InputDate";
import Message from "@/components/ui/Message";
import TagInput from "@/components/tag/TagInput";
import { TagList } from "@/components/tag/TagList";
import TextArea from "@/components/ui/TextArea";

// Hooks
import { useNotes } from "@/hooks/useNotes";

// Icons
import { CgUndo } from "react-icons/cg";

interface Props {
    className?: string,
    triggerRefresh: () => void,
}

export default function NoteForm({
    className,
    triggerRefresh,
}: Props) {
    const emptyNote: Note = {
        _id: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
        tags: [],
    };

    const [newNote, setNewNote] = useState(emptyNote);
    const [message, setMessage] = useState<MessageType>();

    // Function that push request to note backend API
    const { createNote } = useNotes();

    // Used to focus to input after submiting a note
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Focus on input content when note created with success
    useEffect(() => {
        if (message?.type == 'success') {
            inputRef.current?.focus();
        }
    }, [message]);

    // Handle the form submit to create a new note
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        resetMessage();

        try {
            const res = await createNote(newNote);

            if (!res) {
                throw new Error("La requête de création d'une nouvelle note a échoué.");
            }

            if (res.success) {
                // Set success message for user
                setMessage({
                    content: "Note ajoutée avec succès !",
                    type: 'success',
                    visible: true
                });

                // Refresh notes displayed
                triggerRefresh();
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            
            // Set error message for user
            setMessage({
                content: message,
                type: 'error',
                visible: true
            });
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

    // Reset info message and handle note content changes
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({
            content: '',
            type: 'success',
            visible: false
        })
        setNewNote({ ...newNote, content: e.target.value });
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNote({
            ...newNote,
            date: e.target.value
        })
    }

    // Set the current tag that the user is typing
    const handleTagInputChange = (newTags: Tag[]) => {
        setNewNote(
            {
                ...newNote,
                tags: newTags
            }
        );
    }

    // Check if all note inputs are valid for creation
    function noteIsValid() {
        if (!newNote.content) {
            return false;
        }

        if (!newNote.date) {
            return false;
        }

        return true;
    }

    // Reset note form inputs
    const handleResetNote = () => {
        setNewNote(emptyNote);
        resetMessage();
    }

    return (
        <form
            className={`flex flex-col gap-4 w-full ${className}`}
            onSubmit={handleSubmit}
        >
            <TagList
                handleTagChange={(newTags: Tag[]) => handleTagInputChange(newTags)}
                tags={newNote.tags}
            />
            <TextArea
                value={newNote.content}
                inputRef={inputRef}
                onChange={(e) => {handleContentChange(e)}}
            />
            <span className="flex gap-2">
                <InputDate
                    onChange={handleDateChange}
                    value={newNote.date}
                />
                <TagInput
                    className="flex-2"
                    handleTagChange={(newTags: Tag[]) => handleTagInputChange(newTags)}
                    tags={newNote.tags}
                />
            </span>
            <span className="flex gap-4">
                <Button
                    className="flex-1"
                    disabled={noteIsValid() ? false : true}
                    type="submit"
                >
                    Créer la note
                </Button>
                <Button
                    className="w-12"
                    icon={CgUndo}
                    type="button"
                    onClick={handleResetNote}
                >
                </Button>
            </span>
            {message &&
            <Message
                content={message.content}
                type={message.type}
                visible={message.visible}
            />}
        </form>
    );
}