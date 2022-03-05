import types from '../types';

const initialValue : (string | null) = null;


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: string | undefined}){
    switch(type){
        case types.SET_CARDS_VIEW_ID:
            return payload;
        default:
            return store;
    }
};

export default reducer;