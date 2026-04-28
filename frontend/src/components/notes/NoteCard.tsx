import type { Note } from "@/types";

import { TagItem } from "@/components/tag/TagItem";

interface Props {
    note: Note,
    selected?: boolean,
    onClick?: () => void
}

export function NoteCard({
    note,
    selected = false,
    onClick
}: Props) {
    return (
        <li
            key={note._id}
            className={`grid gap-4 p-3 border-2 ${selected ? 'border-emerald-800 bg-stone-900/35' : 'border-stone-800'} rounded-lg cursor-pointer hover:border-emerald-500`}
            onClick={onClick}
        >
            <p>{note.date}</p>
            {note.tags.length > 0 && (
                <span className="flex flex-wrap self-start gap-2">
                {note.tags.map((tag) => (
                    <TagItem key={tag.key} name={tag.label} />
                ))}
                </span>
            )}
            <p className="whitespace-pre-line">{note.content}</p>
        </li>
    );
}