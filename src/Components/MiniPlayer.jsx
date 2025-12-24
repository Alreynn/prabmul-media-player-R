import { ChevronsLeft, Pause, Play, ChevronsRight } from 'lucide-react'

const setIconSize = "text-center size-[3rem] stroke-[1.5] rounded-full p-1.5 active:text-neutral-200";
export const MiniPlayer = ({ audio, isShowMini, setShowMini, showFloat, coverPic, title, artistName, backward, isPlayed, setPlayAudio, funct, forward }) => {
    // When this button is clicked, it'll close the mini player.
    const dropdown = (e) => {
        e.stopPropagation();
        setShowMini(false);
        setPlayAudio(false);
        audio.current.currentTime = 0;
    }
    
    return (
        <button className={`
        fixed flex flex-col items-center bg-gradient-to-b from-[#87CEEB]/50 to-blue-300/50 backdrop-blur-[5px] w-full z-10 border rounded-xl text-left
        transition-all duration-500
        md:w-3/5 md:ml-3
            ${isShowMini ? "opacity-100 bottom-20" : "opacity-0 pointer-events-none -bottom-16"}
        `} onClick={showFloat}>
            <div className="flex flex-row gap-3 p-3 pb-2 w-full">
                <img src={coverPic} className="aspect-square object-cover rounded w-[3em]" />
                <div className="flex flex-col flex-1 min-w-0">
                    <p className="font-bold text-2xl -mb-2 w-6/7 truncate">{title}</p>
                    <p className="w-6/7 truncate">{artistName}</p>
                </div>
                <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                    <ChevronsLeft onClick={backward} className={setIconSize} />
                    {isPlayed ?
                        <Pause onClick={funct} className={setIconSize} />
                    :
                        <Play onClick={funct} className={setIconSize} />
                    }
                    <ChevronsRight onClick={forward} className={setIconSize} />
                </div>
            </div>
            <div onClick={(e) => dropdown(e)} className="flex w-36 h-[.2em] bg-white rounded-2xl mb-1 active:bg-neutral-200"></div>
        </button>
    )
}