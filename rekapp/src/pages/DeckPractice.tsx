import {useEffect, useState, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Navbar from '../components/Navbar';
import CardItem from '../components/CardItem';

import axios from '../utils/axios';
import * as actions from '../store/actions/cardsActions';

import {Deck, DeckCards} from '../interfaces';
import { RootState } from '../store/store';

function DeckPractice() {

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const cards : DeckCards = useSelector((state : RootState) => state.cards);
    

    const [deckId, indexString] = (useLocation<Deck>()).pathname.split("/").slice(2, 4);
    const index = parseInt(indexString);

    const currentCard = cards.cards[index - 1];

    const getCardsCb = useCallback(
        async () => {

            if(cards.currentCard) {
                setLoading(false);
                return
            };

            const deckInfo : Deck =  (await axios.get(`/deck/${deckId}`)).data;
            const deckCards : DeckCards = {...deckInfo, currentCard: deckInfo.cards[index], progress: {total: deckInfo.cards.length, current: index}}
            dispatch(actions.loadDeck(deckCards));
            setLoading(false);

        },
        [deckId, cards.currentCard, index, dispatch],
    )

    useEffect(() => {
        getCardsCb();

    }, [getCardsCb]);

    return (
        <div>
            <Navbar />
            {loading && (<div>Loading</div>)}
            {(!loading && currentCard) && (
                <CardItem card={currentCard} />
            )}
        </div>
    )
}

export default DeckPractice
