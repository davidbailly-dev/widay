interface Props {
    value?: string,
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputDate({ value, className, onChange }: Props) {
    return (
        <input
            className={`bg-stone-800 p-2 rounded-lg border-2 border-transparent focus:border-2 focus:border-emerald-700 focus:outline-0 ${className}`}
            type="date"
            value={value}
            onChange={onChange}
        />
    )
}