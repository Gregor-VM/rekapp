import { Card } from '../../interfaces';
import types from '../types';


const initialValue : ({card: Card | null, editing: boolean, deckId: string}) = ({
    deckId: "",
    card: null,
    editing: false
});

interface Payload {
    card: Card | null,
    deckId: string
}


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: Payload}){
    switch(type){
        case types.SET_CARD_EDIT:
            return {...store, deckId: payload === null ? "" : payload.deckId, editing: payload === null ? false : true, card: payload === null ? null : payload.card};
        default:
            return store;
    }
};

export default reducer;