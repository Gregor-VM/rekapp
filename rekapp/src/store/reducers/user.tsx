import types from '../types';
import {User} from '../../interfaces'


const initialValue : ({username: string, email: string, profileImg: string}) = ({
    username: "",
    email: "",
    profileImg: ""
});


const reducer = function (store = initialValue, {type, payload} : {type: string, payload: User}){
    switch(type){
        case types.SET_USER:
            return payload;
        default:
            return store;
    }
};

export default reducer;