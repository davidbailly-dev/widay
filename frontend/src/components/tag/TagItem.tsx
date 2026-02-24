import { IoIosCloseCircle } from 'react-icons/io';

interface Props {
    name: string
}

export function TagItem({ name }: Props) {
    return (
        <span
            className="flex items-center h-8 bg-orange-500 hover:bg-red-600 rounded-sm px-2 py-1 gap-1 cursor-pointer"
        >
            <span
            >
                {name}
            </span>
            <span>
                <IoIosCloseCircle />
            </span>
        </span>
    );
}