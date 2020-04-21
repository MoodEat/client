import axios from 'axios';

const setFavorite = (data) => {
    return { type: 'SET_FAVORITE', payload: data }
}

const setLoading = (data) => {
    return { type: 'SET_LOADING', payload: data }
}

const getFavorite = (data) => {
    return { type: 'GET_FAVORITE', payload: data }
}

export const addFavorite = (id, token) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/favorites',
            headers: {
                token
            },
            data: {
                restaurantId: id
            }
        })
            .then(({ data }) => {
                console.log('===================');
                console.log('add to favorite data: ', data);
                console.log('===================');
                dispatch(setFavorite(data));
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                setLoading(false);
            })
    }
}

export const fetchFavorite = (token) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'get',
            url: 'http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/favorites',
            headers: {
                token
            }
        })
            .then(({ data }) => {
                console.log('==================');
                console.log('favorite data: ', data);
                console.log('==================');

                dispatch(getFavorite(data));
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                setLoading(false);
            })
    }
}

export const deleteFavorite = (id, token) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'delete',
            url: `http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/favorites/${id}`,
            headers: {
                token
            }
        })
            .then(({ data }) => {
                console.log('success delete data');
                // return axios({
                //     method: 'get',
                //     url: 'http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/favorites',
                //     headers: {
                //         token
                //     }
                // })
                dispatch(fetchFavorite(token));
            })
            // .then(({ data }) => {
            //     dispatch(getFavorite(data));
            // })
            .catch(error => {
                console.log('===========');
                console.log('masuk fetch data habis delete error', error);
            })
            .finally(_ => {
                setLoading(false);
            })
    }
}
