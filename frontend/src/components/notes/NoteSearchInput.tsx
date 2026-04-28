import Input from "@/components/ui/Input";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function NoteSearchInput({ value, onChange }: Props) {
    return (
        <Input
            className="w-full"
            placeholder="Rechercher des notes..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}