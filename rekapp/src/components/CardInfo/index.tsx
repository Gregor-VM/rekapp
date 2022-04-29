import darkNormalStyles from './card_info.module.scss';
import darkSmallStyles from './card_info_small.module.scss';
import lightNormalStyles from './card_info.light.module.scss';
import lightSmallStyles from './card_info_small.light.module.scss';

import {useState, createRef} from 'react';
import {Img, Audio} from '../../interfaces/index'
import useThemeChanger from '../../hooks/useThemeChanger';

function CardInfo({cardInfo, small} : {small: boolean, cardInfo: {img: Img | undefined, audio: Audio | undefined, text: string}}) {

    const smallStyles = useThemeChanger(darkSmallStyles, lightSmallStyles);
    const normalStyles = useThemeChanger(darkNormalStyles, lightNormalStyles);

    const styles = small ? smallStyles : normalStyles;

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
                {cardInfo.img?.data && (<img alt={cardInfo.img?.title} src={cardInfo.img?.data}></img>)}
                
                {cardInfo.audio?.data && (
                    <div onClick={() => playOrPause(true)} className={isPlaying.front ? "" : styles.playing}>
                    {isPlaying.front ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                    </div>
                )}
                <audio onPause={() => toggle(true)} onPlay={() => toggle(true)} autoPlay={!small} ref={audioRef} hidden>
                    <source src={cardInfo.audio?.data} type="audio/ogg" />
                </audio>
        </div>
    )
}

export default CardInfo;
