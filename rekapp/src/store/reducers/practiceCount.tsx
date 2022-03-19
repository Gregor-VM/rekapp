import types from '../types';

const initialValue : {count: number, total: number | null} = {
    count: 1,
    total: null
};


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: number | undefined}){
    switch(type){
        case types.INCREMENT_PRACTICE_COUNT:
            return {...store, count: store.count + 1};
        case types.RESET_PRACTICE_COUNT:
            return {count: 0, payload: null};
        case types.SET_TOTAL:
            return {...store, total: payload};
        default:
            return store;
    }
};

export default reducer;