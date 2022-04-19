import {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/decksActions';

import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import DeckComp from '../../components/Deck';
import axios from '../../utils/axios';
import { Deck } from '../../interfaces';
import { RootState } from '../../store/store';

interface DeckStore {
  decks: Deck[]
  sharedDecks: Deck[]
}

function SharedWithMe() {

    const [loading, setLoading] = useState(true);
    const decks : DeckStore = useSelector((state: RootState) => state.decks);
    const dispatch = useDispatch();

    const getDecksCallback = useCallback(async () => {
        setLoading(true);
        const decks : Deck[] = ((await axios.get("/decks/share-with-me")).data)
        dispatch(actions.loadSharedDecks(decks));
        setLoading(false);
      }, [dispatch, setLoading]);
    
      useEffect(() => {
        if(decks.sharedDecks.length > 0) {
          setLoading(false);
          return
        };
        if(loading) getDecksCallback();
      }, [getDecksCallback, decks.sharedDecks.length, loading]);

    return (
        <>
          <Modal />
          <Navbar />
          <DeckComp decks={decks.sharedDecks} loading={loading} />
        </>
    );
}

export default SharedWithMe
