import './App.scss';
import {useEffect} from 'react';

import {Provider} from 'react-redux';
import store from './store/store';

import Navbar from './components/Navbar';
import Deck from './components/Deck';
import Modal from './components/Modal';

function App() {

  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => console.log(data));
  }, [])

  return (
    <Provider store={store}>
      <Modal />
      <Navbar />
      <Deck />
    </Provider>
  );
}

export default App;
