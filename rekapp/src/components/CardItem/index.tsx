import styles from './card_item.module.scss';


import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useState, createRef} from 'react';

import * as actions from '../../store/actions/cardsActions';
import { initialValue } from '../../store/reducers/cards';


import {Card, DeckCards} from '../../interfaces';
import { RootState } from '../../store/store';

function CardItem({card} : {card: Card}) {

    const [isPlaying, setIsPlaying] = useState({front: true, back: true});
    const [reveal, setReveal] = useState(false);
    const audioFrontRef : React.LegacyRef<HTMLAudioElement> = createRef();
    const audioBackRef : React.LegacyRef<HTMLAudioElement> = createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const deck : DeckCards = useSelector((state: RootState) => state.cards);

    const revealHandler = () => {

        if(!isPlaying.front) playOrPause(true);

        if(!reveal){
            setReveal(true);
        }
    }

    const toggle = (front: boolean) => {
        if(front) setIsPlaying(prev => ({...prev, front: !prev.front}));
        else setIsPlaying(prev => ({...prev, back: !prev.back}));
    }

    const playOrPause = (front: boolean) => {

        let audioRef = front ? audioFrontRef.current : audioBackRef.current;
        let playingState = front ? isPlaying.front : isPlaying.back;

        if(playingState) audioRef?.play();
        else audioRef?.pause();
    }

    const choiceHandler = (answer : boolean) => {

        const currentIndex = (deck.progress.current as number) + 1;

        if(deck.cards[currentIndex - 1] === undefined) {
            dispatch(actions.loadDeck(initialValue));
            history.push("/");
            return;
        }

        dispatch(actions.setCurrentCard(deck.cards[currentIndex - 1]));

        setReveal(false);

        if(deck.progress.current) {
            history.push(`/deck/${deck._id}/${currentIndex}`);
        }

        dispatch(actions.incrementIndex());
    }

    return (
        <div className={styles.container}>
            <div className={styles.front}>
                {card.front}
                <img alt={card.frontImg?.title} src={card.frontImg?.data}></img>
                
                <div onClick={() => playOrPause(true)} className={isPlaying.front ? "" : styles.playing}>
                {isPlaying.front ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                </div>
                <audio onPause={() => toggle(true)} onPlay={() => toggle(true)} autoPlay ref={audioFrontRef} hidden>
                    <source src={card.frontAudio?.data} type="audio/ogg" />
                </audio>

            </div>

            <div onClick={revealHandler} className={reveal ? styles.back : styles.reveal}>
                <span>{reveal ? 
                    <>
                    {card.back}
                    <img alt={card.backImg?.title} src={card.backImg?.data}></img>

                    <div onClick={() => playOrPause(false)} className={isPlaying.back ? "" : styles.playing}>
                    {isPlaying.back ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                    </div>

                    <audio onPause={() => toggle(false)} onPlay={() => toggle(false)} ref={audioBackRef} autoPlay hidden>
                        <source src={card.backAudio?.data} type="audio/ogg" />
                    </audio>
                    </>
             : "Click to reveal"}</span>

                {reveal && (
                    <div>
                        <button onClick={() => choiceHandler(false)} className={styles.fail}>I didn't remember it</button>
                        <button onClick={() => choiceHandler(true)} className={styles.done}>I remembered it!</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CardItem;
