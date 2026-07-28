"use client";

import { useEffect, useState, useRef } from "react";
import { CgUndo } from "react-icons/cg";

import { MessageType, Note } from "@/types";
import Button from "@/components/ui/Button";
import Message from "@/components/ui/Message";
import TagInput from "@/components/tag/TagInput";
import { TagList } from "@/components/tag/TagList";
import TextArea from "@/components/ui/TextArea";

import { useNotes } from "@/hooks/useNotes";

const TAGS_LIMIT_PER_NOTE = 5;

interface Props {
    className?: string,
    selectedNote?: Note,
    triggerRefresh: () => void,
    setSelectedNote: (note: Note | undefined) => void
}

export default function NoteForm({
    className,
    triggerRefresh,
    selectedNote,
    setSelectedNote
}: Props) {
    const [tagToAdd, setTagToAdd] = useState(''); // The tag that the user is inputing before adding it
    const [disabledTagInput, setDisabledTagInput] = useState(false); // Used to disabled TagInput component if max tags limit has been reached
    const emptyNote: Note = {
        date: '',
        content: '',
        tags: [],
    };

    // Function that push request to note backend API
    const { createNote, deleteNote, updateNote } = useNotes();

    // Set selected note or empty note
    const [note, setNote] = useState(() => selectedNote ?? emptyNote);

    // Message content
    const [message, setMessage] = useState<MessageType>();
    
    // Loading
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        resetMessage();

        try {
            if (selectedNote && !note._id) {
                throw new Error("Impossible de modifier une note sans identifiant.");
            }

            const res = await createNote(note);

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

    // Reset info message and handle note content changes
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({
            content: '',
            type: 'success',
            visible: false
        })
        setNote({ ... note, content: e.target.value });
    }

    // Delete an added tag from note
    const handleDeleteTag = (tagKey: string) => {
        setNote({
            ...note,
            tags: note.tags?.filter((tag) => tag.key !== tagKey)
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

        // Generate a random key for a tag
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

    // Reset note form inputs
    const handleResetNote = () => {
        setSelectedNote(undefined);
        setNote(emptyNote);
        setTagToAdd('');
        resetMessage();
    }

    return (
        <form
            className={`flex flex-col gap-4 w-full ${className}`}
            onSubmit={handleSubmit}
        >
            <TagList
                tags={note.tags}
                handleDeleteTag={(tagKey) => handleDeleteTag(tagKey)}
            />
            <TextArea
                value={note.content}
                inputRef={inputRef}
                onChange={(e) => {handleContentChange(e)}}
            />
            <span className="flex flex-row gap-4 w-full">
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
                    disabled={loading}
                >
                    Créer la note
                </Button>
                <Button
                    className="w-12"
                    icon={CgUndo}
                    secondary={true}
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