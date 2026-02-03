type Props = {
    label: string
}

export default function Button({ label }: Props) {
    return (
        <button>
            {label}
        </button>
    );
}