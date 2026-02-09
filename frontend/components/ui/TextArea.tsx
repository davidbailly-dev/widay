interface Params {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({ value, onChange }: Params) {
    return (
        <textarea
            className="p-2 bg-stone-800 rounded-lg border-0 focus:ring-2 focus:outline-0 focus:ring-stone-600"
            rows={4}
            cols={50}
            placeholder="Nouvelle note..."
            value={value}
            onChange={onChange}
        />
    );
};