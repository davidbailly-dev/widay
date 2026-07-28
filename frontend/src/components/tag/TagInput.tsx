import { useEffect, useRef, useState } from "react";

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
}

export default function TagInput({
    className,
    tags = [],
    handleTagChange,
}: Props) {
    const [tagToAdd, setTagToAdd] = useState('');
    const [disabled, setDisabled] = useState(tags.length >= TAGS_LIMIT_PER_NOTE);

    useEffect(() => {
        // If tags limit is reached, disabled the possibility to add new ones

        const counter = tags.length;

        if (counter >= TAGS_LIMIT_PER_NOTE) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [tags]);

    // Add a new tag
    const handleAddTag = () => {
        const tagKey = crypto.randomUUID();
        const newTags = [...tags, { key: tagKey, label: tagToAdd }];

        handleTagChange?.(newTags);

        setTagToAdd('');
    }

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagToAdd(e.target.value.trim());
    }

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on input after clicking on add button
    const handleOnClick = () => {
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