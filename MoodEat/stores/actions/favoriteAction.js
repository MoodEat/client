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

export const addFavorite = (id) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/favorites',
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

export const fetchFavorite = () => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/favorites'
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

export const deleteFavorite = (id) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'delete',
            url: `http://localhost:3000/favorites/${id}`
        })
            .then(({ data }) => {
                console.log('success delete data');
                return axios({
                    method: 'get',
                    url: 'http://localhost:3000/favorites'
                })
            })
            .then(({ data }) => {
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