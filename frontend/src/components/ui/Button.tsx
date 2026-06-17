import React from 'react';

interface ButtonProps {
    active?: boolean;
    children?: string;
    className?: string;
    disabled?: boolean;
    label?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    secondary?: boolean;
}

export default function Button({
    active = false,
    className = '',
    disabled = false,
    secondary = false,
    type = 'button',
    onClick,
    children,
}: ButtonProps) {
    return (
        <button
            className={`${active ? 'bg-emerald-700' : 'bg-transparent'} ${secondary && !active ? 'hover:bg-stone-700 border-stone-700 text-stone-500' : 'hover:bg-emerald-700 border-emerald-700' } border-2 disabled:opacity-50 disabled:hover:bg-transparent rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}