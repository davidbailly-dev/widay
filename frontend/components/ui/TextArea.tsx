interface Params {
    value?: string,
    inputRef?: React.Ref<HTMLTextAreaElement>,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({ value, inputRef, onChange }: Params) {
    return (
        <textarea
            className="p-2 bg-stone-800 rounded-lg border-0 focus:ring-2 focus:outline-0 focus:ring-stone-600"
            ref={inputRef}
            rows={4}
            cols={50}
            placeholder="Ecrire une note..."
            value={value}
            onChange={onChange}
        />
    );
};