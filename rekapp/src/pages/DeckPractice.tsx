import {useEffect, useState, useCallback} from 'react';
import {useLocation} from 'react-router-dom';

import Navbar from '../components/Navbar';
import CardItem from '../components/CardItem';

import axios from '../utils/axios';

import {Deck} from '../interfaces';
import { useDispatch } from 'react-redux';
import * as practiceCountActions from './../store/actions/practiceCountActions';

function DeckPractice() {

    const [loading, setLoading] = useState(true);
    const [queue, setQueue] = useState<number[] | never[]>([]);
    const [cards, setCards] = useState<Deck | null>(null);

    const dispatch = useDispatch();
    

    const [deckId, indexString] = (useLocation<Deck>()).pathname.split("/").slice(2, 4);
    const index = parseInt(indexString);

    const fillQueue = useCallback(
        () => {
            const lengthOfCards = cards?.cards.length;
            let tempArray = [];
            if(lengthOfCards){
                for(let i=1;i<=lengthOfCards;i++) tempArray.push(i);
                setQueue(tempArray);
            }
        },
        [setQueue, cards?.cards.length],
    )

    const getCardsCb = useCallback(
        async () => {

            if(loading){
                const deckInfo : Deck =  (await axios.get(`/deck/${deckId}`)).data;
                dispatch(practiceCountActions.setTotal(deckInfo.cards.length));
                setCards(deckInfo);
                setLoading(false);
            } else {
                if(queue.length === 0){
                    fillQueue();
                }
            }

        },
        [deckId, dispatch, queue, fillQueue, loading],
    )

    useEffect(() => {
        getCardsCb();
    }, [getCardsCb]);

    return (
        <div>
            <Navbar />
            {loading && (<div>Loading</div>)}
            {(!loading) && (
                <CardItem index={index} queue={queue} setQueue={setQueue} deck={cards} card={cards?.cards[index - 1]} />
            )}
        </div>
    )
}

export default DeckPractice
