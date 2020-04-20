const initialState = {
    photoUrl: '',
    mood: '',
    age: '',
    gender: '',
    latitude: '',
    longitude: '',
    token: null
}

export default function userReducer(state = initialState, action) {
    if (action.type === 'SET_PHOTO') {
        return {
            ...state,
            photoUrl: action.payload
        }
    } else if (action.type === 'SET_MOOD') {
        return {
            ...state,
            mood: action.payload
        }
    } else if (action.type === 'SET_AGE') {
        return {
            ...state,
            age: action.payload
        }
    } else if (action.type === 'SET_GENDER') {
        return {
            ...state,
            gender: action.payload
        }
    } else if (action.type === 'SET_LATITUDE') {
        return {
            ...state,
            latitude: action.payload
        }
    } else if (action.type === 'SET_LONGITUDE') {
        return {
            ...state,
            longitude: action.payload
        }
    }
    return state
}