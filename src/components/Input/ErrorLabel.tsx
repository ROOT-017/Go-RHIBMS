export const ErrorLabel = ({ error, className }: { error?: string, className?: string}) => error ? (
    <p
        className={`!text-errorColor bottom-[-20px] px-4 text-ellipsis max-w-full overflow-hidden text-nowrap ${className ?? ''} text-[1.4rem]`}
        title={error}
    >
        {error}
    </p>
) : null;