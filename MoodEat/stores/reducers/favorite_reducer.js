const initialState = {
    loading: false,
    error: null,
    isRefreshing: false,
    favorite: []
}

export default function favoriteReducer(state = initialState, action) {
    if (action.type == 'SET_FAVORITE') {
            return {
                ...state,
                favorite: state.favorite.concat(action.payload)
            };
    } else if (action.type == 'SET_LOADING') {
        return {
            ...state,
            loading: action.payload
        }
    } else if (action.type == 'GET_FAVORITE') {
        return {
            ...state,
            favorite: action.payload
        }
    } else if (action.type == 'SET_REFRESH') {
        return {
            ...state,
            isRefreshing: action.payload
        }
    }

    return state
}