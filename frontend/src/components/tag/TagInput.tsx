import { useRef } from "react";

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Props {
    value?: string,
    className?: string,
    disabled?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TagInput({ value, className, disabled, onChange, onClick }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on input after clicking on add button
    const handleOnClick = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <span className={`flex gap-4 ${className}`}>
            <Input
                className="flex-2 disabled:opacity-50"
                inputRef={inputRef}
                type="text"
                placeHolder='Nom du tag...'
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <Button
                className="flex-1"
                type="button"
                label="Ajouter tag"
                disabled={disabled}
                onClick={(e) => {
                    onClick?.(e);
                    handleOnClick();
                }}
            />
        </span>
    );
}