import axios from 'axios';

const setRestaurant = (data) => {
    console.log(`===========================`);
    console.log(`masuk set restaurant`);
    // console.log(`data:`, data);
    console.log(`===========================`);

    return { type: 'SET_RESTAURANT', payload: data };
}

const setLoading = (data) => {
    return { type: 'SET_LOADING', payload: data };
}

export const fetchRestaurant = (payload) => {
    console.log(`===========================`);
    console.log(`masuk fetch restaurant`);
    console.log(`food:`, payload.food);
    console.log(`===========================`);

    const food = payload.food;
    const latitude = payload.latitude;
    const longitude = payload.longitude;
    
    console.log(`===========================`);
    console.log(`latitude:`, latitude);
    console.log(`===========================`);

    console.log(`===========================`);
    console.log(`longitude:`, longitude);
    console.log(`===========================`);

    return (dispatch) => {
        setLoading(true);
        axios({
            method: 'get',
            url: `http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/restaurant/${food}`,
            headers: {
                lat: latitude,
                longitude: longitude
            }
        })
            .then(({ data }) => {
                console.log(data);
                dispatch(setRestaurant(data))
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                setLoading(false);
            })
    }
}