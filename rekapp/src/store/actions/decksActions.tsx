import { Deck } from "../../interfaces";
import types from "../types";

export const createDeck = (deck: Deck) => {
    return {type: types.CREATE_DECK, payload: deck};
}

export const loadDecks = (decks: Deck[]) => {
    return {type: types.LOAD_DECKS, payload: decks};
}

export const deleteDeck = (deckId: string) => {
    return {type: types.DELETE_DECK, payload: deckId};
}