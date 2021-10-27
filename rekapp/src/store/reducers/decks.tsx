import types from '../types';

import {Deck} from '../../interfaces';

const initialValue: Deck[] = [{
    name: "Book title",
    color: "#ff0000",
    cards: []
}]


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: Deck}){
    switch(type){
        case types.CREATE_DECK:
            return [...store, payload];
        default:
            return store;
    }
};

export default reducer;