import { IoIosCloseCircle } from 'react-icons/io';

interface Props {
    disabled?: boolean,
    name: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function TagItem({
    disabled = false,
    name,
    onClick
}: Props) {
    return (
        <button
            className={`flex items-center h-full bg-emerald-900 rounded-lg px-2 py-1 gap-1 cursor-pointer ${disabled ? '' : 'hover:bg-red-600'}`}
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