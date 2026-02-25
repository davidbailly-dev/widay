import { IoReaderOutline } from 'react-icons/io5';

export default function ToolBar() {
    return (
        <div className="flex flex-row items-center justify-center gap-4 p-4 w-full bg-black border-b-2 border-emerald-900">
            <span className="flex flex-row gap-2 items-center">
                <IoReaderOutline className="h-6 w-6 text-emerald-500" />
                <h1 className="text-emerald-500">Widay</h1>
            </span>
            {/* <ul className="flex flex-row gap-4">
                <li className="bg-emerald-800 p-2 rounded-lg">Element 1</li>
                <li className="bg-emerald-800 p-2 rounded-lg">Element 2</li>
            </ul> */}
        </div>
    );
}