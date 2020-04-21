const initialState = {
    loadingRest: false,
    error: null,
    restaurants: []
}

export default function categoryReducer(state = initialState, action) {
    if (action.type === 'SET_RESTAURANT') {
        return {
            ...state,
            restaurants: action.payload
        }
    } else if (action.type === 'SET_LOADINGREST') {
        return {
            ...state,
            loadingRest: action.payload
        }
    }
    return state
}