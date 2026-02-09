import Input from '@/components/ui/Input';

interface Props {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export default function DateInput({ value, onChange }: Props) {
    return (
        <Input
            type="date"
            value={value}
            onChange={onChange}
        />
    );
}