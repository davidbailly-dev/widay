import React from 'react';

interface ButtonProps {
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    label?: string,
    disabled?: boolean,
    success?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    className = '',
    type = 'button',
    label = 'Label',
    disabled = false,
    success = false,
    onClick
}: ButtonProps) {
    return (
        <button
            className={`${success ? 'bg-emerald-500' : 'bg-blue-500'} disabled:bg-stone-500 rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}