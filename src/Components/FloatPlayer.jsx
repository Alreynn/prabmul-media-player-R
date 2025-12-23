import { useState, useRef, useEffect } from 'react'
import { ChevronDown, RotateCcw, ChevronsLeft, Pause, Play, ChevronsRight, Repeat } from 'lucide-react'

const setFloatIconSize = "size-[3.75rem] stroke-[1.75] active:text-neutral-200";
export const FloatPlayer = ({ audio, isShowFloat, showFloat, coverPic, coverImg, title, artistName, durationEnd, restart, backward, isPlayed, funct, forward }) => {
    const audioSlider = useRef(null);
    const [isLoop, setLoop] = useState(false);
    const loop = () => {
        setLoop(!isLoop);
        audio.current.loop = !isLoop;
    }
    
    // Line 14-27 — Fetches the audio current duration.
    const [currentDuration, setCurrent] = useState(0);
    useEffect(() => {
        audio.current.addEventListener("timeupdate", () => {
            let min = Math.floor(audio.current.currentTime / 60);
                if (min < 10) { min = `0${min}` }
            let sec = Math.floor(audio.current.currentTime % 60);
                if (sec < 10) { sec = `0${sec}` }
            let current = `${min}:${sec}`;
                if (current === 'NaN:NaN') { current = '00:00'; }
            setCurrent(current);
        });
        audioSlider.current.max = Math.floor(audio.current.duration);
        audioSlider.current.value = Math.floor(audio.current.currentTime);
    })
    const changeBySlider = () => { // If user slides the slider, the audio currentTime will change.
        audio.current.currentTime = audioSlider.current.value;
    }
    
    return (
        <div className={`
        fixed backdrop-blur-[6px] w-full h-[100dvh] overflow-y-hidden rounded-t-[30px] border-t-[1px] z-30 p-3 px-5
        transition-all duration-500
            ${isShowFloat ? "visible top-0" : "invisible top-full"}`}
        onClick={(e) => e.stopPropagation()}>
            <ChevronDown onClick={showFloat} className="size-2xl" />
            
            {/* Audio data */}
            <img src={coverPic} className={`mt-[1dvh] mb-[1dvh] rounded-2xl ${coverImg} md:h-72`} />
            <h2 className="font-bold overflow-scroll whitespace-nowrap text-2xl -mb-1">{title}</h2>
            <p className="mb-1">{artistName}</p>
            <input type="range" ref={audioSlider} onInput={changeBySlider} className="w-full bg-transparent" />
            <div className="flex justify-between -mt-2">
                <p>{currentDuration}</p>
                <p>{durationEnd}</p>
            </div>
            
            {/* Audio Control */}
            <div className="flex flex-row justify-evenly items-center">
                <RotateCcw onClick={restart} className={`p-3 ${setFloatIconSize}`} />
                <ChevronsLeft onClick={backward} className={setFloatIconSize} />
                {isPlayed ?
                    <Pause onClick={funct} className={setFloatIconSize} />
                :
                    <Play onClick={funct} className={setFloatIconSize} />
                }
                <ChevronsRight onClick={forward} className={setFloatIconSize} />
                <Repeat onClick={loop} className={`
                    ${setFloatIconSize} rounded-full p-2
                    ${isLoop ? "bg-white text-[#87CEEB]" : "bg-transparent text-white"}`} />
            </div>
        </div>
    )
}