import React from 'react';

interface ButtonProps {
    className?: string,
    disabled?: boolean,
    label?: string,
    secondary?: boolean,
    type?: 'button' | 'submit' | 'reset',
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    className = '',
    disabled = false,
    label = 'Label',
    secondary = false,
    type = 'button',
    onClick
}: ButtonProps) {
    return (
        <button
            className={`bg-transparent ${secondary ? 'hover:bg-stone-700 border-stone-700 text-stone-500' : 'hover:bg-emerald-700 border-emerald-700' } border-2 disabled:opacity-50 disabled:hover:bg-transparent rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}