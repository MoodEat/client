export default function SET_USER(data) {
    return (dispatch) => {
        console.log(data,'dataa----------------------------');
        dispatch(SET_PHOTO(data.imageUrl))
        dispatch(SET_AGE(data.age))
        dispatch(SET_MOOD(data.mood))
        dispatch(SET_GENDER(data.gender))
    }
}


export function SET_PHOTO(data) {
    return {
        type: "SET_PHOTO",
        payload: data
    }
}

export function SET_MOOD(data) {
    return {
        type: "SET_MOOD",
        payload: data
    }
}

export function SET_AGE(data) {
    return {
        type: "SET_AGE",
        payload: data
    }
}

export function SET_GENDER(data) {
    return {
        type: "SET_GENDER",
        payload: data
    }
}


export function SET_LATITUDE(data) {
    return {
        type: "SET_LATITUDE",
        payload: data
    }
}

export function SET_LONGITUDE(data) {
    return {
        type: "SET_LONGITUDE",
        payload: data
    }
}