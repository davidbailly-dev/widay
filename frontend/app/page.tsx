import NoteForm from "@/components/forms/NoteForm";
import NotesList from "@/components/notes/NotesList";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center m-auto w-1/2 p-8 gap-4">
            <NoteForm />
            <NotesList />
        </div>
    );
}
