import types from '../types';

const initialValue : {darkMode: boolean | null} = {
    darkMode: null,
};


const reducer = function (store = initialValue, {type} : {type: string}){
    switch(type){
        case types.CHANGE_THEME:
            return { darkMode: !store.darkMode };
        default:
            return store;
    }
};

export default reducer;