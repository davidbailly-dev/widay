import type { Note } from "@/types";

import { useState } from "react";

// Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { TagList } from "@/components/tag/TagList";
import TagInput from "@/components/tag/TagInput";

// Types
import { Tag } from "@/types";

// Icons
import { FiSave, FiTrash2 } from "react-icons/fi";
import { CgUndo } from "react-icons/cg";

interface Props {
    note: Note,
    isSelected?: boolean,
    onClick?: () => void
}

export function NoteCard({
    note,
    isSelected = false,
    onClick
}: Props) {
    const [tempNote, setTempNote] = useState(note);

    // Handle date value modification
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempNote({
            ...tempNote,
            date: e.target.value.toString()
        });
    }

    // Handle note content modifications
    const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempNote({
            ...tempNote,
            content: e.target.value.toString()
        });
    }

    // Handle tags modifications (addition or deletion)
    const handleChangeTags = (newTags: Tag[]) => {
        setTempNote({
            ...tempNote,
            tags: newTags
        });
    }

    const handleDelete = () => {
        alert('Note deleted');
    }

    const handleReset = () => {
        alert('Note reset to original values');
    }

    const handleSave = () => {
        alert('Card saved');
    }

    return (
        <li
            key={tempNote._id}
            className={`flex flex-col gap-4 p-3 border-2 ${isSelected ? 'border-emerald-500 bg-stone-900/50' : 'border-stone-800'} rounded-lg cursor-pointer hover:border-emerald-500`}
            onClick={onClick}
        >
            <div className={isSelected ? 'hidden' : 'flex flex-col gap-2'}>
                <span className="text-emerald-200">{tempNote.date}</span>
                <TagList
                    tags={tempNote.tags}
                />
                <p>{tempNote.content}</p>
            </div>
            <form className={isSelected ? `flex flex-col gap-4` : 'hidden'}>
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
                            icon={FiSave}
                            onClick={handleSave}
                        />
                        <Button
                            className="h-12 w-12"
                            icon={CgUndo}
                            onClick={handleReset}
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
        </li>
    );
}