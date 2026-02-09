import Input from '@/components/ui/Input';

interface Props {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export default function DateInput({ value, onChange }: Props) {
    return (
        <Input
            type="datetime-local"
            value={value}
            onChange={onChange}
        />
    );
}