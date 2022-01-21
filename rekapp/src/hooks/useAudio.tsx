import {useEffect, useState, useMemo} from 'react';

function useAudio(url : string) {

    const audio = useMemo(() => new Audio(url), [url]);
    const [isPlaying, setIsPlaying] = useState<boolean | null>(null);

    const toggle = () => {
        setIsPlaying(prev => !prev);
    }

    useEffect(() => {

        isPlaying ? audio.play() : audio.pause();

        audio.addEventListener("ended", () => {
            setIsPlaying(null);
        })

        return () => {
            audio.pause();
            audio.removeEventListener("ended", () => {
                setIsPlaying(null);
            });
        }

    }, [isPlaying, audio]);

    return {isPlaying, toggle};
}

export default useAudio;
