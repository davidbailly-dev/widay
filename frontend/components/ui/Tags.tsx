interface Props {
    tags: string[]
};

export default function Tags({ tags }: Props) {
    return (
        tags.length > 0 &&
        <div className="flex gap-2">
        {tags.map((tag) => (
            <span
                key={tag}
                className="bg-blue-400 rounded-sm px-3 py-1"
            >
                    {tag}
            </span>
        ))}
        </div>
    );
}