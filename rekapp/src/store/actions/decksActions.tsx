import { Deck } from "../../interfaces";
import types from "../types";

export const createDeck = (deck: Deck) => {
    return {type: types.CREATE_DECK, payload: deck};
}