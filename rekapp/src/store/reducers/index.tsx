import {combineReducers} from 'redux';
import decks from './decks';
import modal from './modal';
import practiceCount from './practiceCount';
import viewCards from './viewCards';
import cardEdit from './cardEdit';
import user from './user';

export default combineReducers({modal, decks, practiceCount, viewCards, cardEdit, user});