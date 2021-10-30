import styles from './card_item.module.scss';


import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';

import * as actions from '../../store/actions/cardsActions';
import { initialValue } from '../../store/reducers/cards';


import {Card, DeckCards} from '../../interfaces';
import { RootState } from '../../store/store';

function CardItem({card} : {card: Card}) {

    const [reveal, setReveal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const deck : DeckCards = useSelector((state: RootState) => state.cards);

    const revealHandler = () => {
        if(!reveal){
            setReveal(true);
        }
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
            </div>

            <div onClick={revealHandler} className={reveal ? styles.back : styles.reveal}>
                <span>{reveal ? card.back : "Click to reveal"}</span>

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

export default CardItem
