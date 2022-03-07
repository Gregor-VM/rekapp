import {combineReducers} from 'redux';
import decks from './decks';
import modal from './modal';
import cards from './cards';
import viewCards from './viewCards';
import cardEdit from './cardEdit'

export default combineReducers({modal, decks, cards, viewCards, cardEdit});