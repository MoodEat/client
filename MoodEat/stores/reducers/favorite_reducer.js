const initialState = {
    loading: false,
    error: null,
    favorite: []
}

export default function favoritReducer(state = initialState, action) {
    if (action.type == 'SET_FAVORITE') {
        const isExist = state.find(watch => watch.country === action.country)

        if (!isExist) {
            return {
                ...state,
                favorite: action.payload
            };
        } else {
            return state;
        }
        
    } else if (action.type == 'SET_LOADING') {
        return {
            ...state,
            loading: action.payload
        }
    } else if (action.type == 'FETCH_FAVORITE') {
        return {
            ...state,
            favorite: action.payload
        }
    }

    return state
}