import types from '../types';

import {Deck} from '../../interfaces';

//const initialValue: Deck[] = [];

interface DeckStore {
    decks: Deck[]
    sharedDecks: Deck[]
}

const initialValue : DeckStore = {
    decks: [],
    sharedDecks: []
}


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: Deck | Deck[] | string}){
    switch(type){
        case types.CREATE_DECK:
            return {...store, decks: [...store.decks, payload]};
        case types.LOAD_DECKS:
            return {...store, decks: payload};
        case types.DELETE_DECK:
            const newState = store.decks.filter(deck => deck._id !== payload);
            return {...store, decks: newState};
        case types.LOAD_SHARED_DECKS:
            return {...store, sharedDecks: payload};
        default:
            return store;
    }
};

export default reducer;