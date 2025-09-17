

export default function Icon({ iconName, className }: { iconName: string, className?: string }) {
    return (
        <span className={`${"material-symbols-rounded"} ${className}`}>
            {iconName}
        </span>
    )
}