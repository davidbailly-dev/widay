import TextArea from "@/components/ui/TextArea";
import DateInput from "@/components/ui/DateInput";
import Button from "@/components/ui/Button";

export default function NoteForm() {
    return (
        <form className="flex flex-col gap-4 w-full">
            <DateInput />
            <TextArea />
            <Button label="Ajouter" />
        </form>
    );
}