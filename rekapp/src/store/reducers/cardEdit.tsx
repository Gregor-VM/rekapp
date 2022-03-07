import { Card } from '../../interfaces';
import types from '../types';


const initialValue : ({card: Card | null, editing: boolean}) = ({
    card: null,
    editing: false
});


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: Card | null}){
    switch(type){
        case types.SET_CARD_EDIT:
            return {editing: payload === null ? false : true, card: payload};
        default:
            return store;
    }
};

export default reducer;