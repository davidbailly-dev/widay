interface Props {
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    value: string | undefined,
}

export default function InputDate({
    className,
    onChange,
    value = '',
}: Props) {
    return (
        <input
            className={`bg-stone-800 p-2 rounded-lg border-2 border-transparent focus:border-2 focus:border-emerald-700 focus:outline-0 ${className}`}
            type="date"
            onChange={onChange}
            value={value}
        />
    )
}