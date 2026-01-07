export const AudioBox = ({ funct, id, coverImg, cover, title }) => {
    return (
        <button onClick={funct}
            className="flex flex-col flex-none gap-y-1 bg-gradient-to-br from-[#87CEEB] to-blue-300/50 snap-start border-[1px] w-48 p-3 pb-2 rounded-lg transition-all active:text-neutral-200" key={id}>
            <img className={coverImg} src={cover || "/src/assets/notfound.png"} alt={title} />
            <h3 className="text-l font-semibold text-center truncate">{title || "Title"}</h3>
        </button>
    )
}