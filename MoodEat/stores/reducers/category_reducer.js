const initialState = {
    loading: false,
    recommendation: [],
    mood: 'anger'
}

export default function categoryReducer(state = initialState, action) {
    if (action.type === 'SET_PHOTO') {
        return {
            ...state,
            photo: action.payload
        }
    } else if (action.type === 'SET_RECOMMENDATION') {
        return {
            ...state,
            recommendation: action.payload
        }
    }
    return state
}