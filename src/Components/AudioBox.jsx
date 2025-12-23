export const AudioBox = ({ funct, id, coverImg, cover, title }) => {
    return (
        <button onClick={funct}
            className="flex flex-col flex-none bg-gradient-to-br from-[#87CEEB] to-blue-300/50 snap-start border-[1px] w-48 p-3 rounded-[6px] transition-all active:text-neutral-200" key={id}>
            <img className={coverImg} src={cover} />
            <h3 className="text-l font-semibold text-center truncate">{title}</h3>
        </button>
    )
}