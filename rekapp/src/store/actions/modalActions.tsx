import types from '../types'


export const openModal = (content : number) => {
    return {type: types.OPEN_MODAL, payload: {open: true, content}}
};

export const closeModal = () => {
    return {type: types.CLOSE_MODAL, payload: false};
}