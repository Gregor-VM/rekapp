import {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import axios from '../../utils/axios';

import styles from './viewCards.module.scss';

import {RootState} from '../../store/store';
import { Card, Deck } from '../../interfaces';
import CardInfo from '../CardInfo';

function ViewCards() {

    const [cards, setCards] = useState<Card[] | never[]>([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    const deckId = useSelector((state : RootState) => state.viewCards);

    const getCardsFromDeckId = async (deckId: string) => {
        const deckInfo : Deck =  (await axios.get(`/deck/${deckId}`)).data;
        setCards(deckInfo.cards);
        setLoading(false);
    }

    const deleteCard = async (cardId: string | undefined) => {
        if(cardId){
            const response = await axios.delete(`/card/${deckId}/${cardId}`);
            if(response.status === 204){
                setUpdate(prev => !prev);
            }
        }
    };


    useEffect(() => {
        getCardsFromDeckId(deckId);
    }, [update]);

    return (
        !loading ? (
            <div className={styles.view_cards_container}>
                {cards.map(card => {
                    return (<div className={styles.rows}>

                        <CardInfo small={true} cardInfo={{img: card.frontImg, audio: card.frontAudio, text: card.front}} />
                        <CardInfo small={true} cardInfo={{img: card.backImg, audio: card.backAudio, text: card.back}} />

                        <div>
                            <button className={styles.view_cards_button} onClick={() => deleteCard(card._id)}><i className="fas fa-trash"></i></button>
                            <button className={styles.view_cards_button}><i className="fas fa-edit"></i></button>
                        </div>

                        </div>)
                })}
            </div>
        ) : <></>
    )
}

export default ViewCards
