import { useState } from "react";

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Props {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TagInput({ value, onChange, onClick }: Props) {
    return (
        <span className="flex gap-4">
            <Input
                className='flex-4'
                type="text"
                placeHolder='Nom du tag...'
                value={value}
                onChange={onChange}
            />
            <Button
                className='flex-1'
                type="button"
                label="Ajouter tag"
                onClick={onClick}
            />
        </span>
    );
}