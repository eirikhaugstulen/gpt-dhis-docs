type Props = {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    isSubmitting?: boolean;
};

export const PrimaryButton = ({
    label,
    onClick,
    disabled,
    isSubmitting,
    type,
}: Props) => {
    return (
        <button
            className={'px-4 transition-all flex gap-2 items-center whitespace-nowrap rounded py-1 bg-gray-100 border hover:bg-gray-200 hover:border-gray-70'}
            onClick={onClick}
            type={type}
            disabled={disabled || isSubmitting}
        >
            {isSubmitting ? (
                <div className={'flex gap-1 px-4 py-2'}>
                    <div className={'w-2 h-2 bg-sky-500 rounded-full animate-bounce'} />
                    <div className={'w-2 h-2 bg-sky-300 rounded-full animate-bounce animation-delay-200'} />
                    <div className={'w-2 h-2 bg-sky-400 rounded-full animate-bounce animation-delay-300'} />
                </div>
            ) : (
                label
            )}
        </button >
    )
};