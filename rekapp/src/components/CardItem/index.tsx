import styles from './card_item.module.scss';

import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Card, Deck} from '../../interfaces';
import CardInfo from '../CardInfo';

import * as practiceCountActions from './../../store/actions/practiceCountActions';

function CardItem({index, deck, card, setQueue, queue} : {index: number, queue: never[] | number[], deck: Deck | null, card: Card | undefined, setQueue: React.Dispatch<React.SetStateAction<never[] | number[]>>}) {

    const [reveal, setReveal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const revealHandler = () => {

        if(!reveal){
            setReveal(true);
        }
    }


    const choiceHandler = (answer : boolean) => {

        const previousIndex = queue[0];

        // WHEN THE QUEUE IS ABOUT BEING FINISH

        if(queue[1] === undefined && answer){
            dispatch(practiceCountActions.resetPracticeCount());
            history.push("/");
            return;
        };

        // WHEN YOU FAIL THE QUESTION THE CURRENT INDEX NEXT TO BE ADDED AGAIN
        
        setQueue(prev => [...prev, index]);
        
        if(!answer){
            setQueue(prev => [...prev, index]);
        }

        if(answer) dispatch(practiceCountActions.incrementPracticeCount());

        // DELETE THE OLDER ELEMENT IN THE QUEUE

        setQueue(prev => prev.slice(1, -1));

        setReveal(false);

        // REDIRECT TO THE NEXT ELEMENT IN THE QUEUE

        history.push(`/deck/${deck?._id}/${queue[1] === undefined ? previousIndex : queue[1]}`);

    }
    

    return (
        <div className={styles.container}>
            
            <CardInfo small={false} cardInfo={{img: card?.frontImg, audio: card?.frontAudio, text: card?.front || ""}} />

            <div onClick={revealHandler} className={reveal ? styles.back : styles.reveal}>
                <span>{reveal ? 
                    <CardInfo small={false} cardInfo={{img: card?.backImg, audio: card?.backAudio, text: card?.back || ""}} />


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
