import axios from 'axios';

const setFavorite = (data) => {
    return { type: 'SET_FAVORITE', payload: data }
}

const setLoading = (data) => {
    return { type: 'SET_LOADING', payload: data }
}

export const addFavourite = (id) => {
    setLoading(true);

    return (dispatch) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/favorites',
            data: id
        })
            .then(({ data }) => {
                console.log('===================');
                console.log('data add favorite: ', data);
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