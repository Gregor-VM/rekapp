import types from '../types';

import {DeckCards, Card} from '../../interfaces';

const initialValue : DeckCards = {
    _id: undefined,
    backgroundColor: "",
    backgroundImage: "",
    cards: [],
    name: "",
    currentCard: null,
    progress: {total: null, current: null}
};

export {initialValue};


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: DeckCards | Card | undefined}){
    switch(type){
        case types.LOAD_DECK:
            return payload;
        case types.INCREMENT_PROGRESS_INDEX:
            return {...store, progress: 
                {...store.progress, 
                    current: (store.progress.current as number) + 1
                }
            };
        case types.SET_CURRENT_CARD:
            return {...store, currentCard: payload};
        default:
            return store;
    }
};

export default reducer;