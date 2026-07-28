import type { Note } from "@/types";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { TagList } from "@/components/tag/TagList";

import { FiSave, FiTrash2 } from "react-icons/fi";
import { CgUndo } from "react-icons/cg";
import { GrOverview } from "react-icons/gr";

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
    const handleChangeDate = () => {
        alert('Date saved');
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
            key={note._id}
            className={`flex flex-col gap-4 p-3 border-2 ${isSelected ? 'border-emerald-500 bg-stone-900/50' : 'border-stone-800'} rounded-lg cursor-pointer hover:border-emerald-500`}
            onClick={onClick}
        >
            <div className={isSelected ? 'hidden' : 'block space-y-4'}>
                <span className="flex gap-4">
                    <span className="text-emerald-200">{note.date}</span>
                    <TagList className="flex-2 justify-end" tags={note.tags} />
                </span>
                <p>{note.content}</p>
            </div>
            <form className={isSelected ? `flex flex-col gap-4` : 'hidden'}>
                <span className="flex flex-wrap gap-2">
                    <Input
                        className="flex-1"
                        onChange={handleChangeDate}
                        type="date"
                        value={note.date}
                    />
                    <TagList
                        className="flex-1"
                        tags={note.tags}
                    />
                    <span className="flex-2 flex justify-end gap-2">
                        <Button
                            className="h-12"
                            icon={FiSave}
                            onClick={handleSave}
                        />
                        <Button
                            className="h-12"
                            icon={CgUndo}
                            onClick={handleReset}
                        />
                        <Button
                            className="h-12"
                            icon={FiTrash2}
                            onClick={handleDelete}
                        />
                    </span>
                </span>
                <TextArea
                    value={note.content}  
                />
            </form>
        </li>
    );
}