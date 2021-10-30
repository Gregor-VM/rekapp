import {combineReducers} from 'redux';
import decks from './decks';
import modal from './modal';
import cards from './cards'

export default combineReducers({modal, decks, cards});