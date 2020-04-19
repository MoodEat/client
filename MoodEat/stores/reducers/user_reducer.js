const initialState = {
    photoUrl: '',
    mood: '',
    age: '',
    gender: ''
}

export default function userReducer(state = initialState, action) {
    if (action.type === 'SET_PHOTO') {
        return {
            ...state,
            photo: action.payload
        }
    } else if (action.type === 'SET_MOOD') {
        return {
            ...state,
            recommendation: action.payload
        }
    }
    return state
}