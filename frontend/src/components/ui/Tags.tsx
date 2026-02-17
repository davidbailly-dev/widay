import { TagItem } from '@/components/ui/TagItem';

interface Props {
    tags: string[]
}

export default function Tags({ tags }: Props) {
    const handleDeleteTag = (tag: string) => {
        alert('Tag to delete : ' + tag);
    };

    return (
        tags.length > 0 &&
        <div className="flex gap-2">
        {tags.map((tag) => (
            <span key={tag}>{tag}</span>
            // <TagItem key={tag} name={tag} />
        ))}
        </div>
    );
}