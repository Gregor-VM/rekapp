import types from '../types';

import {Deck} from '../../interfaces';

const initialValue: Deck[] = [];


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: Deck | Deck[]}){
    switch(type){
        case types.CREATE_DECK:
            return [...store, payload];
        case types.LOAD_DECKS:
            return payload;
        default:
            return store;
    }
};

export default reducer;