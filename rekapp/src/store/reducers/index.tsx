import {combineReducers} from 'redux';
import decks from './decks';
import modal from './modal'

export default combineReducers({modal, decks});