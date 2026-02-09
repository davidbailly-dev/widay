interface Props {
    className?: string,
    type?: string,
    value?: string,
    placeHolder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({
    className = '',
    type = "text",
    value,
    placeHolder='',
    onChange
}: Props) {
    return (
        <input
            className={`bg-stone-800 p-2 rounded-lg border-0 focus:ring-2 focus:outline-0 focus:ring-stone-600 ${className}`}
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={onChange}
        />
    )
}