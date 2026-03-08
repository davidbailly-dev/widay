interface Params {
    value?: string,
    inputRef?: React.Ref<HTMLTextAreaElement>,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({ value, inputRef, onChange }: Params) {
    return (
        <textarea
            className="p-2 bg-stone-800 rounded-lg border-2 border-transparent focus:border-2 focus:border-emerald-700 focus:outline-0"
            ref={inputRef}
            rows={4}
            cols={50}
            placeholder="Ecrire une note..."
            value={value}
            onChange={onChange}
        />
    );
};