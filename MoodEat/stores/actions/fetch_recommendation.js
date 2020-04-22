import axios from 'axios';

const setRecommendation = (data) => {
    return { type: 'SET_RECOMMENDATION', payload: data };
}

export const fetchRecommendation = (mood) => {
    return (dispatch) => {
        axios.get(`http://ec2-13-229-201-54.ap-southeast-1.compute.amazonaws.com:3000/${mood}`)
            .then(({ data }) => {
                dispatch(setRecommendation(data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}