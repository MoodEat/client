const initialState = {
    photo: '',
    solution: [],
    board: [],
    baseBoard: [],
    loading: false,
    isSolved: false
}

export default function reducer(state = initialState, action) {
    if (action.type === 'SET_PHOTO') {
        return {
            ...state,
            photo: action.payload
        }
    } 
    return state
}