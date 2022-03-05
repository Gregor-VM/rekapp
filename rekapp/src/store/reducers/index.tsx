import {combineReducers} from 'redux';
import decks from './decks';
import modal from './modal';
import cards from './cards';
import viewCards from './viewCards';

export default combineReducers({modal, decks, cards, viewCards});