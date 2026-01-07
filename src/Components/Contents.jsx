export const Contents = ({ title, children }) => {
    return (
        <>
            <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
            <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                {children}
            </div>
        </>
    )
}