import {useEffect, useCallback, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/decksActions';

import Navbar from '../components/Navbar';
import DeckComp from '../components/Deck';
import Modal from '../components/Modal';

import axios from '../utils/axios';

import {Deck} from '../interfaces'
import { RootState } from '../store/store';

function App() {

  const [loading, setLoading] = useState(true);
  const decks : Deck[] = useSelector((state: RootState) => state.decks);
  const dispatch = useDispatch();


  const getDecksCallback = useCallback(async () => {
    setLoading(true);
    const decks : Deck[] = (await axios.get("decks")).data;
    dispatch(actions.loadDecks(decks));
    setLoading(false)
  }, [dispatch, setLoading]);

  useEffect(() => {
    if(decks.length > 0) {
      setLoading(false);
      return
    };
    getDecksCallback()
  }, [getDecksCallback, decks]);

  return (
    <>
      <Modal />
      <Navbar />
      <DeckComp loading={loading} />
    </>
  );
}

export default App;
