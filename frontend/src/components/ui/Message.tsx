import { IoCheckmarkCircleSharp, IoCloseCircleSharp, IoWarningSharp, IoInformationCircleSharp } from "react-icons/io5";

import { MessageType } from "@/types";

const TYPE_CLASSES = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    warning: 'bg-orange-600',
    neutral: 'bg-stone-500'
}

const TYPE_ICONS = {
    success: IoCheckmarkCircleSharp,
    error: IoCloseCircleSharp,
    warning: IoWarningSharp,
    neutral: IoInformationCircleSharp
}

export default function Message({ content, type, visible }: MessageType) {
    const IconComponent = TYPE_ICONS[type];
    
    return (
        visible &&
        <div className={`p-4 rounded-md ${TYPE_CLASSES[type]}`}>
            <IconComponent className="inline-block mr-2 h-6 w-6" />
            <span>{content}</span>
        </div>
    );
}