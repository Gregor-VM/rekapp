import { Card } from '../../interfaces';
import types from '../types';

interface Payload {
    card: Card | null,
    deckId: string
}

export const setCardEdit = (payload: Payload | null) => {
    return {type: types.SET_CARD_EDIT, payload: payload};
};