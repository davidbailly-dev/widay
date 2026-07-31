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
import { CgSpinnerAlt, CgUndo } from "react-icons/cg";

const DEFAULT_USER_MESSAGE: MessageType = {
    content: '',
    type: 'neutral',
    visible: false
};

const DEFAULT_NOTE: Note = {
    _id: '',
    date: '',
    content: '',
    tags: [],
}

interface Props {
    className?: string,
    today: string,
    triggerRefresh: () => void,
}

export default function NoteForm({
    className,
    today,
    triggerRefresh,
}: Props) {
    const [newNote, setNewNote] = useState<Note>({
        ...DEFAULT_NOTE,
        date: today
    });
    const [userMessage, setUserMessage] = useState<MessageType>(DEFAULT_USER_MESSAGE);

    // Function that push request to note backend API
    const { createNote, loading } = useNotes();

    // Used to focus to input after submiting a note
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Focus on input content when note created with success
    useEffect(() => {
        if (userMessage?.type == 'success') {
            inputRef.current?.focus();
        }
    }, [userMessage]);

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
                setUserMessage({
                    content: "Note ajoutée avec succès !",
                    type: 'success',
                    visible: true
                });

                setNewNote({
                    ...DEFAULT_NOTE,
                    date: today,
                });

                // Refresh notes displayed
                triggerRefresh();
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            
            // Set error message for user
            setUserMessage({
                content: message,
                type: 'error',
                visible: true
            });
        }
    }

    // Reset info message for user
    function resetMessage() {
        setUserMessage({
            content: '',
            type: 'neutral',
            visible: false
        })
    }

    // Reset info message and handle note content changes
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMessage(DEFAULT_USER_MESSAGE);
        setNewNote({ ...newNote, content: e.target.value });
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(DEFAULT_USER_MESSAGE);
        setNewNote({
            ...newNote,
            date: e.target.value
        })
    }

    // Set the current tag that the user is typing
    const handleTagsChange = (newTags: Tag[]) => {
        setUserMessage(DEFAULT_USER_MESSAGE);
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
        setNewNote({
            ...DEFAULT_NOTE,
            date: today,
        });
        resetMessage();
    }

    return (
        <form
            className={`relative flex flex-col gap-4 w-full ${className}`}
            onSubmit={handleSubmit}
        >
            {loading &&
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-stone-900 opacity-90 rounded-md">
                    <CgSpinnerAlt className="animate-spin w-8 h-8 text-emerald-500" />
                </div>
            }
            <TagList
                handleTagChange={(newTags: Tag[]) => handleTagsChange(newTags)}
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
                    handleTagChange={(newTags: Tag[]) => handleTagsChange(newTags)}
                    onTagInputChange={() => setUserMessage(DEFAULT_USER_MESSAGE)}
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
            {userMessage &&
            <Message
                content={userMessage.content}
                type={userMessage.type}
                visible={userMessage.visible}
            />}
        </form>
    );
}