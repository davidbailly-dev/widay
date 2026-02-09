import { IoIosCloseCircle } from 'react-icons/io';

interface Props {
    tags: string[]
};

export default function Tags({ tags }: Props) {
    const handleDeleteTag = (tag: string) => {
        alert('Tag to delete : ' + tag);
    };

    return (
        tags.length > 0 &&
        <div className="flex gap-2">
        {tags.map((tag) => (
            <span
                key={tag}
                className="flex items-center bg-blue-400 rounded-sm px-2 py-1 gap-1 cursor-pointer"
                onClick={() => handleDeleteTag(tag)}
            >
                <span
                >
                    {tag}
                </span>
                <span>
                    <IoIosCloseCircle />
                </span>
            </span>
        ))}
        </div>
    );
}