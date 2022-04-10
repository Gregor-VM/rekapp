import {useEffect, useCallback, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/decksActions';

import Navbar from '../components/Navbar';
import DeckComp from '../components/Deck';
import Modal from '../components/Modal';

import axios from '../utils/axios';

import {Deck} from '../interfaces'
import { RootState } from '../store/store';

interface DeckStore {
  decks: Deck[]
  sharedDecks: Deck[]
}

function App() {

  const [loading, setLoading] = useState(true);
  const decks : DeckStore = useSelector((state: RootState) => state.decks);
  const dispatch = useDispatch();


  const getDecksCallback = useCallback(async () => {
    setLoading(true);
    const decks : Deck[] = (await axios.get("decks")).data;
    dispatch(actions.loadDecks(decks));
    setLoading(false);
  }, [dispatch, setLoading]);

  useEffect(() => {
    if(decks.decks.length > 0) {
      setLoading(false);
      return
    };
    if(loading) getDecksCallback();
  }, [getDecksCallback, decks.decks.length, loading]);
  

  return (
    <>
      <Modal />
      <Navbar />
      <DeckComp loading={loading} decks={decks.decks} />
    </>
  );
}

export default App;
