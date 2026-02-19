import { useState } from 'react'

export const useStates = () => {
    const [title, setTitle] = useState("");
    const [artistName, setArtistName] = useState("");
    const [coverPic, setCover] = useState("");
    const [url, setUrl] = useState(null);
    const [lyric, setLyricURL] = useState(null);
    const [fetchedLyric, setFetchingLyric] = useState([]);
    
    const [isPlayed, setPlayAudio] = useState(false);
    const [isShowMini, setShowMini] = useState(false);
    const [isShowFloat, setShowFloat] = useState(false);

    return {
        title, setTitle,
        artistName, setArtistName,
        coverPic, setCover,
        url, setUrl,
        lyric, setLyricURL,
        fetchedLyric, setFetchingLyric,
        isPlayed, setPlayAudio,
        isShowMini, setShowMini,
        isShowFloat, setShowFloat,
    }
}