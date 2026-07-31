import React from 'react';

import { IconType } from 'react-icons';

interface ButtonProps {
    active?: boolean,
    children?: string,
    className?: string,
    disabled?: boolean,
    icon?: IconType,
    label?: string,
    textColor?: string,
    type?: 'button' | 'submit' | 'reset',
    secondary?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    className = '',
    disabled = false,
    icon: Icon,
    secondary = false,
    type = 'button',
    onClick,
    children,
}: ButtonProps) {
    let colorClassName = "hover:bg-emerald-700 border-emerald-500 text-emerald-500 hover:text-emerald-300";

    if (secondary) {
        colorClassName = "hover:bg-orange-700 border-orange-500 text-orange-500 hover:text-orange-300";
    }

    return (
        <button
            className={`bg-transparent ${colorClassName} border-2 disabled:opacity-50 disabled:hover:bg-transparent rounded-md p-2 cursor-pointer ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {Icon && <Icon className="h-full w-full" />}
            {children}
        </button>
    );
}