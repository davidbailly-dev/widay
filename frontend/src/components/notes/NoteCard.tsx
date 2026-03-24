import type { Note } from "@/types";

import { TagItem } from "@/components/tag/TagItem";

export function NoteCard({
    _id,
    date,
    content,
    tags
}: Note) {
    return (
        <li key={_id} className="grid gap-4 p-3 border-2 border-stone-800 rounded-lg">
            <p>{date}</p>
            {tags.length > 0 && (
                <span className="flex flex-wrap self-start gap-2">
                {tags.map((tag) => (
                    <TagItem key={tag.key} name={tag.label} />
                ))}
                </span>
            )}
            <p className="whitespace-pre-line">{content}</p>
        </li>
    );
}