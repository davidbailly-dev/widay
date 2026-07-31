// Main
import { useRef, useState } from "react";

// Types
import { Tag } from "@/types";

// Components
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const TAGS_LIMIT_PER_NOTE = 5;

interface Props {
    tags: Tag[],
    className?: string,
    handleTagChange?: (newTags: Tag[]) => void,
    onTagInputChange?: () => void,
}

export default function TagInput({
    className,
    tags = [],
    handleTagChange,
    onTagInputChange,
}: Props) {
    const [tagToAdd, setTagToAdd] = useState('');
    const disabled = tags.length >= TAGS_LIMIT_PER_NOTE;

    // Add a new tag
    const handleAddTag = () => {
        const tagKey = crypto.randomUUID();
        const newTags = [...tags, { key: tagKey, label: tagToAdd }];

        handleTagChange?.(newTags);

        setTagToAdd('');
        setFocusOnTagInput();
    }

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagToAdd(e.target.value.trim());
        onTagInputChange?.();
    }

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on input after clicking on add button
    const setFocusOnTagInput = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <span className={`flex gap-4 ${className}`}>
            <Input
                className="flex-2 disabled:opacity-50"
                inputRef={inputRef}
                type="text"
                placeholder='Nom du tag...'
                value={tagToAdd}
                onChange={handleTagInputChange}
                disabled={disabled}
            />
            <Button
                className="flex-1"
                type="button"
                disabled={disabled}
                onClick={handleAddTag}
            >
                Ajouter tag
            </Button>
        </span>
    );
}