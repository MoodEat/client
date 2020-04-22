import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default function SET_USER(data) {
    return (dispatch) => {
        dispatch(SET_PHOTO(data.imageUrl))
        dispatch(SET_AGE(data.age))
        dispatch(SET_MOOD(data.mood))
        dispatch(SET_GENDER(data.gender))
    }
}

export function SET_LOADING(data) {
    return {
        type: "SET_LOADING",
        payload: data
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

export function SET_ISLOGIN(data) {
    return {
        type: "SET_ISLOGIN",
        payload: data
    }
}

export function SET_TOKEN(data) {
    return {
        type: "SET_TOKEN",
        payload: data
    }
}


export function POST_LOGIN(data) {
    let {email, password} = data
    return (dispatch) => {
        dispatch(SET_LOADING(true))
        axios({
            method: 'post',
            url: 'http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/login',
            data: {
                email, password
            }
        })
        .then(({data}) => {
            let {token} = data
            _storeData = async () => {
                try {
                    await AsyncStorage.setItem('userToken', token);
                } catch (error) {
                    // Error saving data
                    console.log(error,'ini');
                }
            };
            if (token) {
                dispatch(SET_ISLOGIN(true))
                dispatch(SET_TOKEN(token))
            }
        })
        .catch(err => {
            console.log(err,'errorrrrr');
        })
        .finally(_ => {
            dispatch(SET_LOADING(false))
        })
    }
}


export function POST_REGISTER(data) {
    let {name, email, password} = data
    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/register',
            data: {
                name, email, password
            }
        })
        .then(({data}) => {
            let {token} = data
            if (token) {
                dispatch(SET_ISLOGIN(true))
                dispatch(SET_TOKEN(token))
            }
        })
        .catch(err => {
            console.log(err,'errorrrrr');
            
        })
    }
}
