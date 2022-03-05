import types from '../types'

export const setViewCardId = (id: string | null) => {
    return {type: types.SET_CARDS_VIEW_ID, payload: id};
};
