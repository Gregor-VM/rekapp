import {useEffect, useCallback, useState} from 'react';

import {useDispatch} from 'react-redux';
import * as actions from '../store/actions/decksActions';

import Navbar from '../components/Navbar';
import DeckComp from '../components/Deck';
import Modal from '../components/Modal';

import axios from '../utils/axios';

import {Deck} from '../interfaces'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  const getDecksCallback = useCallback(async () => {
    setLoading(true);
    const decks : Deck[] = (await axios.get("decks")).data;
    dispatch(actions.loadDecks(decks));
    setLoading(false)
  }, [dispatch, setLoading]);

  useEffect(() => {
    getDecksCallback()
  }, [getDecksCallback])

  return (
    <>
      <Modal />
      <Navbar />
      <DeckComp loading={loading} />
    </>
  );
}

export default App;
