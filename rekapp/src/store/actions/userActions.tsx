import { User } from '../../interfaces';
import types from '../types';

export const setUser = (user: User) => {
    return {type: types.SET_USER, payload: user};
};
