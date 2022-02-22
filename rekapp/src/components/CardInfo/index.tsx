import styles from './card_info.module.scss';

import {useState, createRef} from 'react';
import {Img, Audio} from '../../interfaces/index'

function CardInfo({cardInfo} : {cardInfo: {img: Img | undefined, audio: Audio | undefined, text: string}}) {

    const [isPlaying, setIsPlaying] = useState({front: true, back: true});
    const audioRef: React.LegacyRef<HTMLAudioElement> = createRef();


    const toggle = (front: boolean) => {
        if(front) setIsPlaying(prev => ({...prev, front: !prev.front}));
        else setIsPlaying(prev => ({...prev, back: !prev.back}));
    }

    const playOrPause = (front: boolean) => {

        let playingState = front ? isPlaying.front : isPlaying.back;

        if(playingState) audioRef?.current?.play();
        else audioRef?.current?.pause();
        
    }

    return (
        <div className={styles.container}>
                {cardInfo.text}
                <img alt={cardInfo.img?.title} src={cardInfo.img?.data}></img>
                
                <div onClick={() => playOrPause(true)} className={isPlaying.front ? "" : styles.playing}>
                {isPlaying.front ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                </div>
                <audio onPause={() => toggle(true)} onPlay={() => toggle(true)} autoPlay ref={audioRef} hidden>
                    <source src={cardInfo.audio?.data} type="audio/ogg" />
                </audio>
        </div>
    )
}

export default CardInfo;
