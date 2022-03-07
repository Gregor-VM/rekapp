import { Card } from '../../interfaces';
import types from '../types';

export const setCardEdit = (card: Card | null) => {
    return {type: types.SET_CARD_EDIT, payload: card};
};