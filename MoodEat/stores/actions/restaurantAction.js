import axios from 'axios';

const setRestaurant = (data) => {
    return { type: 'SET_RESTAURANT', payload: data };
}

const setLoadingRest = (data) => {
    return { type: 'SET_LOADINGREST', payload: data };
}

export const fetchRestaurant = (payload) => {
    const food = payload.food;
    const latitude = payload.latitude;
    const longitude = payload.longitude;

    return (dispatch) => {
        dispatch(setLoadingRest(true))
        axios({
            method: 'get',
            url: `http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/restaurant/${food}`,
            headers: {
                lat: latitude,
                longitude: longitude
            }
        })
            .then(({ data }) => {
                dispatch(setRestaurant(data))
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                dispatch(setLoadingRest(false))
            })
    }
}