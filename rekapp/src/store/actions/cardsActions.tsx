import { Card, DeckCards } from '../../interfaces';
import types from '../types'

export const setCurrentCard = (card: Card) => {
    return {type: types.SET_CURRENT_CARD, payload: card};
}

export const loadDeck = (deck: DeckCards) => {
    return {type: types.LOAD_DECK, payload: deck};
}

export const incrementIndex = () => {
    return {type: types.INCREMENT_PROGRESS_INDEX};
}