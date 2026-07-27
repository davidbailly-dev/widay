import React from 'react';

import { IconType } from 'react-icons';

interface ButtonProps {
    active?: boolean;
    children?: string;
    className?: string;
    disabled?: boolean;
    icon?: IconType;
    label?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    secondary?: boolean;
}

export default function Button({
    active = false,
    className = '',
    disabled = false,
    icon: Icon,
    secondary = false,
    type = 'button',
    onClick,
    children,
}: ButtonProps) {
    return (
        <button
            className={`bg-transparent hover:bg-emerald-700 border-emerald-700 text-emerald-500 hover:text-emerald-300 border-2 disabled:opacity-50 disabled:hover:bg-transparent rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {Icon && <Icon className="h-full w-full" />}
            {children}
        </button>
    );
}