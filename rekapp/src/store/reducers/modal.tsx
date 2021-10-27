import types from '../types';

const initialValue = {
    open: false,
    content: null
};


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: any}){
    switch(type){
        case types.OPEN_MODAL:
            return { open: payload.open, content: payload.content};
        case types.CLOSE_MODAL:
            return {...store, open: payload};
        default:
            return store;
    }
};

export default reducer;