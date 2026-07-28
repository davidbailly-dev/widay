import { Tag } from "@/types";
import { TagItem } from "@/components/tag/TagItem";

interface Props {
    className: string,
    tags: Tag[]
}

export function TagList({
    className = '',
    tags = []
}: Props) {
    return (
        <div
            className={`flex gap-2 ${className}`}>
        {
            tags.map((tag) => (
                <TagItem
                    key={tag.key}
                    name={tag.label}
                />
            ))
        }
        </div>
    );
}