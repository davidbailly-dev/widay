import { useRef } from 'react';

interface Props {
    className?: string,
    type?: string,
    value?: string,
    placeHolder?: string,
    inputRef?: React.Ref<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({
    className = '',
    type = "text",
    value,
    placeHolder='',
    inputRef,
    onChange
}: Props) {
    return (
        <input
            className={`bg-stone-800 p-2 rounded-lg border-2 border-transparent focus:border-2 focus:border-emerald-700 focus:outline-0 ${className}`}
            ref={inputRef}
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={onChange}
        />
    )
}