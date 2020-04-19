const initialState = {
    loading: false,
    error: null,
    restaurants: []
}

export default function categoryReducer(state = initialState, action) {
    if (action.type === 'SET_RESTAURANT') {
        return {
            ...state,
            restaurants: action.payload
        }
    }
    return state
}