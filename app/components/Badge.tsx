export default function Badge({children}: {children: React.ReactNode}) {
    return (
        <div className="flex items-center justify-center h-7 min-w-7 text-xs text-accent font-semibold bg-accent/25 p-2 rounded-full select-none">
            <p>{children}</p>
        </div>
    )
}