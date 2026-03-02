interface Props {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputDate({ value, onChange }: Props) {
    return (
        <input
            type="date"
            value={value}
            onChange={onChange}
        />
    )
}