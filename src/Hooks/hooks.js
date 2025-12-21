import { useState } from 'react'

export const useStates = () => {
    const [title, setTitle] = useState("");
    const [artistName, setArtistName] = useState("");
    const [coverPic, setCover] = useState("");
    const [url, setUrl] = useState(null);
    
    const [isPlayed, setPlayAudio] = useState(false);
    const [isShowMini, setShowMini] = useState(false);
    const [isShowFloat, setShowFloat] = useState(false);
    const [isLoop, setLoop] = useState(false);

    return {
        title, setTitle,
        artistName, setArtistName,
        coverPic, setCover,
        url, setUrl,
        isPlayed, setPlayAudio,
        isShowMini, setShowMini,
        isShowFloat, setShowFloat,
        isLoop, setLoop
    }
}