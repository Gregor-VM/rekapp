import {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import axios from '../../utils/axios';

import styles from './viewCards.module.scss';

import {RootState} from '../../store/store';
import { Card, Deck } from '../../interfaces';
import CardInfo from '../CardInfo';

function ViewCards() {

    const [cards, setCards] = useState<Card[] | never[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const deckId = useSelector((state : RootState) => state.viewCards);

    const getCardsFromDeckId = async (DeckId: string) => {
        const deckInfo : Deck =  (await axios.get(`/deck/${deckId}`)).data;
        setCards(deckInfo.cards);
        setLoading(false);
    }


    useEffect(() => {
        getCardsFromDeckId(deckId);
    }, []);

    return (
        !loading ? (
            <div className={styles.container}>
                {cards.map(card => {
                    return (<div className={styles.rows}>
                        <CardInfo small={true} cardInfo={{img: card.frontImg, audio: card.frontAudio, text: card.front}} />
                        <CardInfo small={true} cardInfo={{img: card.backImg, audio: card.backAudio, text: card.back}} />
                        </div>)
                })}
            </div>
        ) : <></>
    )
}

export default ViewCards
