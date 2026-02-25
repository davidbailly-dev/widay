import Input from "@/components/ui/Input";

interface Props {
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export function NoteSearchInput({ onChange }: Props) {
    return (
        <Input
            className="w-full"
            placeHolder="Rechercher des notes..."
            onChange={onChange}
        />
    );
}