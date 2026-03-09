import { IoIosCloseCircle } from 'react-icons/io';

interface Props {
    name: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function TagItem({ name, onClick }: Props) {
    return (
        <button
            className="flex items-center h-8 bg-orange-500 hover:bg-red-600 rounded-sm px-2 py-1 gap-1 cursor-pointer"
            type="button"
            onClick={onClick}
        >
            <span
            >
                {name}
            </span>
            <span>
                <IoIosCloseCircle />
            </span>
        </button>
    );
}