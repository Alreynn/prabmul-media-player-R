import { useState, useEffect, useRef } from 'react'
import { useStates } from './Hooks/hooks'
import './App.css'
import { Header, Popup, Contents, AudioBox, MiniPlayer, FloatPlayer, Footer, Closed } from './Components'
import { RotateCcw, ChevronsLeft, Play, Pause, ChevronsRight, Repeat, ChevronDown } from 'lucide-react'
import useWindowSize from './window.jsx'
import song from './songs.json'
import changelog from './changelog.json'

const coverImg = "aspect-square object-cover rounded-lg h-auto";

const App = () => {
    const audio = useRef(null);
    const [isShowHidden, setShowHidden] = useState(false);
    const songs = song.list;
    const {
        title, setTitle,
        artistName, setArtistName,
        coverPic, setCover,
        url, setUrl,
        isPlayed, setPlayAudio,
        isShowMini, setShowMini,
        isShowFloat, setShowFloat,
    } = useStates();
    
    // MiniPlayer and FloatPlayer adjuster by screen width
    const { width } = useWindowSize();
    useEffect(() => {
        if (width >= 768 && isPlayed) {
            setShowFloat(true);
            setShowMini(false);
        } else if (width < 768 && isShowFloat) {
            setShowFloat(true);
            setShowMini(true);
        } else if (width < 768 && isPlayed) {
            setShowFloat(false);
            setShowMini(true);
        }
        
        if (isShowFloat && (width < 768)) {
            const original = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = original;
        }
    }, [width, isPlayed, isShowFloat]);
    
    useEffect(() => {
        isPlayed ? audio.current.play() : audio.current.pause();
    }, [isPlayed])
    
    // Audio Player
    const backward = () => audio.current.currentTime -= 10;
    const play = (title, artist, cover, url) => { 
        setTitle(title || "Title");
        setArtistName(artist || "Unknown");
        setCover(cover || "notfound.png");
        setUrl(url);
        
        setPlayAudio(!isPlayed);
        if (audio.current.paused) {
            audio.current.play();
            setPlayAudio(true);
        } else {
            audio.current.pause();
            setPlayAudio(false);
        }
    }
    const random = (max) => Math.floor(Math.random() * max);
    useEffect(() => {
        // Idk what's this one for, since it is AI generated
        const audiocur = audio.current;
        if (!audiocur || !url) return;
    
        audiocur.load();
        audiocur.play().catch(() => {});
        setPlayAudio(true);
        
        const ifSongEnd = () => {
            // Searches for every index in song.hidden, if played url is from song.hidden, then it's true.
            const isPlayHidden = song.hidden.find(item => url === item.url);
        
            const list = isPlayHidden ? song.hidden : songs;
            let rand = random(list.length);
            const chosen = list[rand];
            play(chosen.title, chosen.artist, chosen.cover, chosen.url);
        }
        
        audiocur.addEventListener("ended", ifSongEnd);
        return () => audiocur.removeEventListener("ended", ifSongEnd);
    }, [url]);
    const forward = () => audio.current.currentTime += 10;
    
    const showFloat = () => setShowFloat(!isShowFloat);

    return (
        <div className="bg-gradient-to-b from-blue-300/90 to-[#87CEEB] min-h-[100dvh] min-w-full overflow-hidden font-helvetica text-white select-none">
            <audio ref={audio} src={url} />
            <Header />
            <Popup changesParagraph={changelog.paragraph} changesList={changelog.list} lastUpdated={changelog.lastUpdated} />
            
            <main className="p-3 px-4">
                <h1 onDoubleClick={() => setShowHidden(true)} className="text-3xl font-bold my-3">Cari lagu yang sesuai dengan kebutuhanmu akan Prabowo-Jokowi.</h1>
                <Contents title="Musik yang Tersedia">
                    {songs.map((item) => (
                        <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                    ))}
                </Contents>
                
                <Contents title="Kesukaan Prabowo">
                    {songs.map((item, index) => {
                        if (index === 2) {
                            return (
                                <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                            )
                        }
                        return null;
                    })}
                </Contents>
                
                <Contents title="Sempat Viral">
                    {songs.map((item, index) => {
                        if (index === 4) {
                            return (
                                <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                            )
                        }
                        return null;
                    })}
                </Contents>
                
                {isShowHidden && (
                    <Contents title="Absolute Banger (Save Europe)">
                        {song.hidden.map((item) => (
                            <AudioBox funct={() => play(item.title, item.artist, item.cover, item.url)} id={item.id} coverImg={coverImg} cover={item.cover} title={item.title} />
                        ))}
                    </Contents>
                )}
            </main>
            
            {/* Mini Player */}
            <MiniPlayer
                audio={audio} isShowMini={isShowMini} setShowMini={setShowMini} showFloat={showFloat} coverPic={coverPic} title={title} artistName={artistName}
                backward={backward} isPlayed={isPlayed} setPlayAudio={setPlayAudio} funct={() => play(title, artistName, coverPic)} forward={forward} />
            
            {/* Float Player */}
            <FloatPlayer
                audio={audio} setShowFloat={setShowFloat} setPlayAudio={setPlayAudio} isShowFloat={isShowFloat} showFloat={showFloat} coverPic={coverPic} coverImg={coverImg} title={title}
                artistName={artistName} backward={backward} isPlayed={isPlayed} funct={() => play(title, artistName, coverPic)} forward={forward} />
            
            <div className="mt-16"></div>
            <Footer />
        </div>
    )
}

export default App