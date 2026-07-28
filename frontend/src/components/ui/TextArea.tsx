interface Params {
    disabled?: boolean,
    value?: string,
    inputRef?: React.Ref<HTMLTextAreaElement>,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({
    disabled = false,
    value,
    inputRef,
    onChange
}: Params) {
    return (
        <textarea
            className="p-2 bg-stone-800 rounded-lg border-2 border-transparent focus:border-2 focus:border-emerald-700 focus:outline-0"
            cols={50}
            disabled={disabled}
            onChange={onChange}
            placeholder="Ecrire une note..."
            ref={inputRef}
            rows={4}
            value={value}
        />
    );
};