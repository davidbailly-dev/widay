import { IoIosCloseCircle } from 'react-icons/io';

interface Props {
    name: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function TagItem({ name, onClick }: Props) {
    return (
        <button
            className="flex items-center h-8 bg-emerald-900 hover:bg-red-600 rounded-sm px-2 py-1 gap-1 cursor-pointer"
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