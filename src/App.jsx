import { useState, useEffect, useRef } from 'react'
import { Header, AudioBox, MiniPlayer, Footer } from './Components' // Need further assistance 
import { useStates } from './Hooks/hooks'
import './App.css'
import { RotateCcw, ChevronsLeft, Play, Pause, ChevronsRight, Repeat, ChevronDown } from 'lucide-react'
import { tak_ingin_sendiri_cover, oke_gas_cover, oke_prabowo_cover, thx_jokowi_cover } from './assets/index'
import { tak_ingin_sendiri, oke_gas, oke_prabowo, thx_jokowi } from './assets/index'

// Song collection
const songs = [
    { id: 1, cover: tak_ingin_sendiri_cover, url: tak_ingin_sendiri, title: 'Tak Ingin Sendiri', artist: 'Dian Piesesha' },
    { id: 2, cover: oke_gas_cover, url: oke_gas, title: 'Oke Gas 2', artist: 'Richard Jersey' },
    { id: 3, cover: oke_prabowo_cover, url: oke_prabowo, title: 'Oke Gas Prabowo-Gibran Paling Pas', artist: 'Richard Jersey' },
    { id: 4, cover: thx_jokowi_cover, url: thx_jokowi, title: 'Terima Kasih Pak Jokowi', artist: 'Kang Lidan' },
]

const coverImg = "aspect-square object-cover rounded h-auto";
const setFloatIconSize = "size-[3.75rem] stroke-[1.75] active:text-neutral-200";

const App = () => {
    const audio = useRef(null);
    const audioSlider = useRef(null);
    const {
        title, setTitle,
        artistName, setArtistName,
        coverPic, setCover,
        url, setUrl,
        isPlayed, setPlayAudio,
        isShowMini, setShowMini,
        isShowFloat, setShowFloat,
        isLoop, setLoop
    } = useStates();
    
    // Audio Player
    const restart = () => audio.current.currentTime = 0;
    const backward = () => audio.current.currentTime -= 10;
    const play = (title, artist, cover, url) => { 
        setTitle(title);
        setArtistName(artist);
        setCover(cover);
        setUrl(url);
        
        setPlayAudio(!isPlayed);
        setShowMini(true);
    }
    useEffect(() => {
        isPlayed ? audio.current.play() : audio.current.pause();
    }, [isPlayed])
    
    const forward = () => { audio.current.currentTime += 10 };
    const loop = () => {
        setLoop(!isLoop);
        audio.current.loop = !isLoop;
    }
    
    // Line 57–89 — Functions to render duration, including currentTime and audio duration.
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
        audio.current.addEventListener("ended", () => {
            setPlayAudio(false);
        })
        audioSlider.current.max = Math.floor(audio.current.duration);
        audioSlider.current.value = Math.floor(audio.current.currentTime);
    });
    const changeBySlider = () => { // If user slides the slider, the audio currentTime will change.
        audio.current.currentTime = audioSlider.current.value;
    }
    
    const [durationEnd, setEndDuration] = useState(0);
    const duration = () => {
        let minutesEnd = Math.floor(audio.current.duration / 60);
            if (minutesEnd < 10) { minutesEnd = `0${minutesEnd}` }
        let secondsEnd = Math.floor(audio.current.duration % 60);
            if (secondsEnd < 10) { secondsEnd = `0${secondsEnd}` }
        let musicDuration = `${minutesEnd}:${secondsEnd}`;
            if (musicDuration === 'NaN:NaN') { musicDuration = '00:00'; }
        setEndDuration(musicDuration)
    }
    // Detects if user clicks on the different AudioBox, then plays the audio without being it paused.
    useEffect(() => {
        setPlayAudio(true);
    }, [title])
    
    const showFloat = () => setShowFloat(!isShowFloat);
    
    return (
        <div className="bg-gradient-to-b from-blue-300/90 to-[#87CEEB] min-h-[100dvh] overflow-hidden font-helvetica text-white">
            <audio ref={audio} src={url} onLoadedMetadata={duration} />
            <Header />
            
            <main className="p-3 px-4">
                <h1 className="text-3xl font-bold mb-3">Cari lagu yang sesuai dengan kebutuhanmu akan Prabowo-Jokowi.</h1>
                <h2 className="text-2xl font-bold mb-2">Musik Pilihan Kami</h2>
                <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                    {songs.map((item) => {
                        return (
                            <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                        )
                    })}
                </div>
            </main>
            
            {/* Mini Player */}
            <MiniPlayer
            audio={audio} isShowMini={isShowMini} setShowMini={setShowMini} showFloat={showFloat} coverPic={coverPic} title={title} artistName={artistName}
            backward={backward} isPlayed={isPlayed} setPlayAudio={setPlayAudio} funct={() => play(title, artistName, coverPic)} forward={forward} />
            
            {/* Float Player */}
            <div className={`
            fixed backdrop-blur-[6px] h-[100dvh] overflow-y-hidden rounded-t-[30px] border-t-[1px] z-30 p-3 px-5
            transition-all duration-500
            ${isShowFloat ? "visible top-0" : "invisible top-full"}
            `} onClick={(e) => e.stopPropagation()}>
                <ChevronDown onClick={showFloat} className="size-2xl" />
                <img src={coverPic} className={`mt-[1dvh] mb-[1dvh] rounded-2xl ${coverImg} md:h-72`} />
                <h2 className="font-bold text-2xl -mb-1">{title}</h2>
                <p className="mb-1">{artistName}</p>
                <input type="range" ref={audioSlider} onInput={changeBySlider} className="w-full bg-transparent" />
                <div className="flex justify-between -mt-2">
                    <p>{currentDuration}</p>
                    <p>{durationEnd}</p>
                </div>
                <div className="flex flex-row justify-evenly items-center">
                    <RotateCcw onClick={restart} className={`p-3 ${setFloatIconSize}`} />
                    <ChevronsLeft onClick={backward} className={setFloatIconSize} />
                    {isPlayed ? <Pause onClick={() => play(title, artistName, coverPic)} className={setFloatIconSize} /> : <Play onClick={() => play(title, artistName, coverPic)} className={setFloatIconSize} />}
                    <ChevronsRight onClick={forward} className={setFloatIconSize} />
                    <Repeat onClick={loop} className={`${setFloatIconSize} rounded-xl p-2 ${isLoop ? "bg-white text-[#87CEEB]" : "bg-transparent text-white"}`} />
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default App