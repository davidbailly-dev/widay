// Types
import { Tag } from "@/types";

// Components
import { TagItem } from "@/components/tag/TagItem";

interface Props {
    className?: string,
    tags: Tag[],
    handleTagChange?: (newTags: Tag[]) => void
}

export function TagList({
    className = '',
    tags = [],
    handleTagChange
}: Props) {
    const handleDeleteTag = (tagKey: string) => {
        const newTags = tags.filter((tag) => tag.key !== tagKey);

        handleTagChange?.(newTags);
    }

    return (
        <div
            className={`flex flex-wrap gap-2 ${className}`}>
        {
            tags.map((tag) => (
                <TagItem
                    key={tag.key}
                    name={tag.label}
                    onClick={() => handleDeleteTag(tag.key)}
                />
            ))
        }
        </div>
    );
}