export default function TextArea() {
    return (
        <textarea
            className="p-2 bg-stone-800 rounded-lg border-0 focus:ring-2 focus:outline-0 focus:ring-stone-600"
            rows={4}
            cols={50}
            placeholder="Nouvelle note..."
        />
    );
};