import { IoReaderOutline } from 'react-icons/io5';

export default function ToolBar({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex flex-row items-center justify-center gap-4 p-6 w-full bg-black border-b-2 border-emerald-900">
            <span className="flex flex-row gap-2 items-center">
                <IoReaderOutline className="h-6 w-6 text-emerald-500" />
                <h1 className="text-emerald-500">Widay</h1>
            </span>
            <span>
                {children}
            </span>
        </div>
    );
}