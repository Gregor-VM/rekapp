import types from '../types'

export const incrementPracticeCount = () => {
    return {type: types.INCREMENT_PRACTICE_COUNT};
}

export const resetPracticeCount = () => {
    return {type: types.RESET_PRACTICE_COUNT};
}

export const setTotal = (total: number) => {
    return {type: types.SET_TOTAL, payload: total};
}