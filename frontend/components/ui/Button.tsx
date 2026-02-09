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
            className={`bg-blue-500 hover:bg-blue-600 border border-white disabled:bg-stone-500 rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}