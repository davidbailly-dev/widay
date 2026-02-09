export interface MessageType {
    content: string,
    type: 'success' | 'error' | 'warning' | 'neutral',
    visible: boolean
}

const TYPE_CLASSES = {
    success: 'bg-emerald-700',
    error: 'bg-red-600',
    warning: 'bg-orange-600',
    neutral: 'bg-stone-500'
}

export function Message({ content, type, visible }: MessageType) {
    return (
        visible &&
        <div className={`p-4 rounded-md ${TYPE_CLASSES[type]}`}>
            {content}
        </div>
    );
}