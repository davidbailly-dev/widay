import type { Note } from "@/types";

import { useState } from "react";

// Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Message from "@/components/ui/Message";
import TextArea from "@/components/ui/TextArea";
import { TagList } from "@/components/tag/TagList";
import TagInput from "@/components/tag/TagInput";

// Hooks
import { useNotes } from "@/hooks/useNotes";

// Types
import { MessageType, Tag } from "@/types";

// Icons
import { FiSave, FiTrash2 } from "react-icons/fi";
import { CgSpinnerAlt } from "react-icons/cg";

const DEFAULT_USER_MESSAGE: MessageType = {
    content: '',
    type: 'neutral',
    visible: false
};

interface Props {
    note: Note,
    isSelected?: boolean,
    onClick?: () => void
    onDelete?: () => void
}

export function NoteCard({
    note,
    isSelected = false,
    onClick,
    onDelete
}: Props) {
    const [loading, setLoading] = useState(false);
    const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [prevIsSelected, setPrevIsSelected] = useState(isSelected);
    const [tempNote, setTempNote] = useState(note);
    const [userMessage, setUserMessage] = useState<MessageType>(DEFAULT_USER_MESSAGE);
    const { deleteNote, updateNote } = useNotes();

    // Used to manage 'Message' component visibilty
    // if it has been displayed previously
    if (isSelected !== prevIsSelected) {
        setPrevIsSelected(isSelected);

        if (!isSelected) {
            setUserMessage(DEFAULT_USER_MESSAGE);
        }
    }

    // Handle date value modification
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempNote({
            ...tempNote,
            date: e.target.value.toString()
        });

        setIsEditing(true);
    }

    // Handle note content modifications
    const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempNote({
            ...tempNote,
            content: e.target.value.toString()
        });

        setIsEditing(true);
    }

    // Handle tags modifications (addition or deletion)
    const handleChangeTags = (newTags: Tag[]) => {
        setTempNote({
            ...tempNote,
            tags: newTags
        });

        setIsEditing(true);
    }

    async function handleDelete() {
        const confirmed = window.confirm("Voulez-vous vraiment supprimer cette note ?");

        if (!confirmed) {
            return;
        }

        setLoading(true);

        try {
            const res = await deleteNote(note._id);

            if (!res || !res.success) {
                throw new Error("La requête de suppression de la note a échouée.");
            }

            setUserMessage({
                content: "Note supprimée avec succès !",
                type: 'success',
                visible: true
            });

            setHasBeenDeleted(true);

            setTimeout(() => {
                onDelete?.();
            }, 2000);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            
            setUserMessage({
                content: "Echec lors de la suppression : " + message,
                type: 'error',
                visible: true
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await updateNote(note._id, tempNote);

            if (!res || !res.success) {
                throw new Error("La requête d'enregistrement de la note a échoué.");
            }

            setIsEditing(false);

            setUserMessage({
                type: 'success',
                content: 'Enregistré avec succès !',
                visible: true
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';

            setUserMessage({
                type: 'error',
                content: "L'enregistrement a échoué : " + message,
                visible: true
            });
        } finally {
            setLoading(false);
        }
    }

    <CgSpinnerAlt className="self-center animate-spin w-8 h-8 text-emerald-500" />

    return (
        <li
            key={tempNote._id}
            className={`relative flex flex-col gap-4 p-3 border-2 ${isSelected ? 'border-emerald-500 bg-stone-900/50' : 'border-stone-800'} rounded-lg cursor-pointer hover:border-emerald-500`}
            onClick={onClick}
        >
            {loading &&
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-stone-900 opacity-90 rounded-md">
                    <CgSpinnerAlt className="animate-spin w-8 h-8 text-emerald-500" />
                </div>
            }
            {!hasBeenDeleted && (
                <>
                <div className={isSelected ? 'hidden' : 'flex flex-col gap-2'}>
                    <span className="text-emerald-200">{tempNote.date}</span>
                    <TagList
                        tags={tempNote.tags}
                    />
                    <p>{tempNote.content}</p>
                </div>
                <form
                    className={isSelected ? `flex flex-col gap-4` : 'hidden'}
                    onSubmit={handleSubmit}
                >
                    
                    <span className="flex flex-wrap gap-2">
                        <Input
                            onChange={(e) => handleChangeDate(e)}
                            type="date"
                            value={tempNote.date}
                        />
                        <TagList
                            handleTagChange={(newTags: Tag[]) => handleChangeTags(newTags)}
                            tags={tempNote.tags}
                        />
                        <TagInput
                            handleTagChange={(newTags: Tag[]) => handleChangeTags(newTags)}
                            tags={tempNote.tags}
                        />
                        <span className="flex-2 flex justify-end gap-2">
                            <Button
                                className="h-12 w-12"
                                disabled={loading}
                                icon={FiSave}
                                secondary={isEditing}
                                type="submit"
                            />
                            <Button
                                className="h-12 w-12"
                                icon={FiTrash2}
                                onClick={handleDelete}
                            />
                        </span>
                    </span>
                    <TextArea
                        onChange={(e) => handleChangeContent(e)}
                        value={tempNote.content}  
                    />
                </form>
                </>
            )}
            {userMessage.visible && isSelected && (
                <Message
                    content={userMessage.content}
                    type={userMessage.type}
                    visible={userMessage.visible}
                />
            )}
        </li>
    );
}