import {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import axios from '../../utils/axios';

import darkStyles from './viewCards.module.scss';
import lightStyles from './viewCards.light.module.scss';

import {RootState} from '../../store/store';
import { Card, Deck } from '../../interfaces';
import CardInfo from '../CardInfo';

import * as modalActions from '../../store/actions/modalActions';
import * as cardEditActions from '../../store/actions/cardEditActions';
import Loading from '../Loading';
import useThemeChanger from '../../hooks/useThemeChanger';

function ViewCards() {

    const styles = useThemeChanger(darkStyles, lightStyles);

    const [cards, setCards] = useState<Card[] | never[]>([]);
    const [update, setUpdate] = useState(false);
    const [loadingDeleteCard, setLoadingDeleteCard] = useState("");
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();

    const deckId = useSelector((state : RootState) => state.viewCards);

    const getCardsFromDeckId = async (deckId: string) => {
        const deckInfo : Deck =  (await axios.get(`/deck/${deckId}`)).data;
        setCards(deckInfo.cards);
        setLoading(false);
    }

    const deleteCard = async (cardId: string | undefined) => {
        setLoadingDeleteCard(cardId || "");
        if(cardId){
            const response = await axios.delete(`/card/${deckId}/${cardId}`);
            if(response.status === 204){
                setUpdate(prev => !prev);
            }
        }
    };


    const editCard = (card: Card) => {
        dispatch(modalActions.openModal(1));
        dispatch(cardEditActions.setCardEdit({card, deckId}));
    };


    useEffect(() => {
        getCardsFromDeckId(deckId);
    }, [update, deckId]);

    return (
        !loading ? (
            <div className={styles.view_cards_container}>
                <span className={styles.title}><h2>Cards</h2><i onClick={() => dispatch(modalActions.closeModal())} className="fas fa-window-close"></i></span>
                {cards.map(card => {
                    return (<div key={card._id} className={styles.rows}>

                        <CardInfo small={true} cardInfo={{img: card.frontImg, audio: card.frontAudio, text: card.front}} />
                        <CardInfo small={true} cardInfo={{img: card.backImg, audio: card.backAudio, text: card.back}} />

                        <div>
                            <button className={styles.view_cards_button} onClick={() => deleteCard(card._id)}>{loadingDeleteCard !== card._id ? <i className="fas fa-trash"></i> : <Loading />}</button>
                            <button className={styles.view_cards_button} onClick={() => editCard(card)}><i className="fas fa-edit"></i></button>
                        </div>

                        </div>)
                })}
            </div>
        ) : <div className={styles.loading}><Loading /></div>
    )
}

export default ViewCards
