import React from 'react';

interface ButtonProps {
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    label?: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    className = '',
    type = 'button',
    label = 'Label',
    disabled = false,
    onClick
}: ButtonProps) {
    return (
        <button
            className={`bg-transparent hover:bg-emerald-700 border-2 border-emerald-700 disabled:bg-stone-500 rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}