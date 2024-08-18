export default function Badge({children}: {children: React.ReactNode}) {
    return (
        <div className="flex items-center h-7 min-w-7 text-center text-xs text-accent font-semibold bg-accent/25 p-2 rounded-full cursor-default select-none">
            {children}
        </div>
    )
}