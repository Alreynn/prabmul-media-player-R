import { useState, useEffect, useRef } from 'react'
import { useStates } from './Hooks/hooks'
import './App.css'
import { Header, Popup, AudioBox, MiniPlayer, FloatPlayer, Footer } from './Components' // Need further assistance 
import { RotateCcw, ChevronsLeft, Play, Pause, ChevronsRight, Repeat, ChevronDown } from 'lucide-react'
import { tak_ingin_sendiri_cover, oke_gas_cover, oke_prabowo_cover, thx_jokowi_cover, mou_koi_nante_shinai_cover } from './assets/index'
import { tak_ingin_sendiri, oke_gas, oke_prabowo, thx_jokowi, mou_koi_nante_shinai } from './assets/index'
import changelog from './changelog.json'

// Song collection
const songs = [
    { id: 1, cover: oke_gas_cover, url: oke_gas, title: 'Oke Gas 2', artist: 'Richard Jersey' },
    { id: 2, cover: oke_prabowo_cover, url: oke_prabowo, title: 'Oke Gas Prabowo-Gibran Paling Pas', artist: 'Richard Jersey' },
    { id: 3, cover: tak_ingin_sendiri_cover, url: tak_ingin_sendiri, title: 'Tak Ingin Sendiri', artist: 'Dian Piesesha' },
    { id: 4, cover: thx_jokowi_cover, url: thx_jokowi, title: 'Terima Kasih Pak Jokowi', artist: 'Kang Lidan' },
    { id: 5, cover: mou_koi_nante_shinai_cover, url: mou_koi_nante_shinai, title: 'もう恋なんてしない (Mou Koi Nante Shinai)', artist: '槇原敬之 (Makihara Noriyuki)' },
]

const coverImg = "aspect-square object-cover rounded h-auto";

const App = () => {
    const audio = useRef(null);
    const {
        title, setTitle,
        artistName, setArtistName,
        coverPic, setCover,
        url, setUrl,
        isPlayed, setPlayAudio,
        isShowMini, setShowMini,
        isShowFloat, setShowFloat,
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
    const forward = () => audio.current.currentTime += 10;
    
    const random = (max) => Math.floor(Math.random() * max);
    // This useEffect with audio eventListener inside of it detects if the song has ended, and it'll shuffle the song played next.
    // For some reason, this useEffect gives out a lot of re-rendering. I couldn't figure it out what caused this.
    // Also, sometimes it replays the same song.
    // Even if a while loop has applied, it instantly crashes the site.
    useEffect(() => {
        audio.current.addEventListener("ended", () => {
            let rand = random(songs.length);
            const chosen = songs[rand];
            play(chosen.title, chosen.artist, chosen.cover, chosen.url);
        })
    })
    
    // Detects if user clicks on the different AudioBox, then plays the audio without being it paused.
    useEffect(() => {
        setPlayAudio(true);
    }, [title])
    
    // Fetches the audio duration
    const [durationEnd, setEndDuration] = useState(`00:00`);
    const duration = () => {
        let minutesEnd = Math.floor(audio.current.duration / 60);
            if (minutesEnd < 10) { minutesEnd = `0${minutesEnd}` }
        let secondsEnd = Math.floor(audio.current.duration % 60);
            if (secondsEnd < 10) { secondsEnd = `0${secondsEnd}` }
        let musicDuration = `${minutesEnd}:${secondsEnd}`;
            if (musicDuration === 'NaN:NaN') { musicDuration = '00:00'; }
        setEndDuration(musicDuration)
    }
    
    const showFloat = () => setShowFloat(!isShowFloat);

    return (
        <div className="bg-gradient-to-b from-blue-300/90 to-[#87CEEB] min-h-[100dvh] min-w-full overflow-hidden font-helvetica text-white">
            <audio ref={audio} src={url} onLoadedMetadata={duration} />
            <Header />
            <Popup changesParagraph={changelog.paragraph} changesList={changelog.list} />
            
            <main className="p-3 px-4">
                <h1 className="text-3xl font-bold my-3">Cari lagu yang sesuai dengan kebutuhanmu akan Prabowo-Jokowi.</h1>
                <h2 className="text-2xl font-bold mt-4 mb-2">Musik yang Tersedia</h2>
                <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                    {songs.map((item) => {
                        return (
                            <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                        )
                    })}
                </div>
                
                <h2 className="text-2xl font-bold mt-4 mb-2">Kesukaan Prabowo</h2>
                <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                    {songs.map((item, index) => {
                        if (index === 2) {
                            return (
                                <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                            )
                        } else { return null };
                    })}
                </div>
                
                <h2 className="text-2xl font-bold mt-4 mb-2">Lagi Viral</h2>
                <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                    {songs.map((item, index) => {
                        if (index === 4) {
                            return (
                                <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                            )
                        } else { return null };
                    })}
                </div>
            </main>
            
            {/* Mini Player */}
            <MiniPlayer
                audio={audio} isShowMini={isShowMini} setShowMini={setShowMini} showFloat={showFloat} coverPic={coverPic} title={title} artistName={artistName}
                backward={backward} isPlayed={isPlayed} setPlayAudio={setPlayAudio} funct={() => play(title, artistName, coverPic)} forward={forward} />
            
            {/* Float Player */}
            <FloatPlayer
                audio={audio} isShowFloat={isShowFloat} showFloat={showFloat} coverPic={coverPic} coverImg={coverImg} title={title} artistName={artistName} durationEnd={durationEnd}
                restart={restart} backward={backward} isPlayed={isPlayed} funct={() => play(title, artistName, coverPic)} forward={forward} />
            
            <div className="mt-16"></div>
            <Footer />
        </div>
    )
}

export default App