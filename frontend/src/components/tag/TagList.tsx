import { Tag } from "@/types";
import { TagItem } from "@/components/tag/TagItem";

interface Props {
    className?: string,
    tags: Tag[],
    handleDeleteTag?: (tagKey: string) => void
}

export function TagList({
    className = '',
    tags = [],
    handleDeleteTag
}: Props) {
    return (
        <div
            className={`flex flex-wrap gap-2 ${className}`}>
        {
            tags.map((tag) => (
                <TagItem
                    key={tag.key}
                    name={tag.label}
                    onClick={() => handleDeleteTag?.(tag.key)}
                />
            ))
        }
        </div>
    );
}