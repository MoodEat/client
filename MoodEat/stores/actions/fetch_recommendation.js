// import axios from 'axios';

// const setRecommendation = (data) => {
//     console.log(`===========================`);
//     console.log(`masuk set recommendation`);
//     console.log(`data:`, data);
//     console.log(`===========================`);

//     return { type: 'SET_RECOMMENDATION', payload: data };
// }

// export const fetchRecommendation = (mood) => {
//     console.log(`===========================`);
//     console.log(`masuk fetch recommendation`);
//     console.log(`mood:`, mood);
//     console.log(`===========================`);
    
//     return (dispatch) => {
//         axios.get(`http://localhost:3000/${mood}`)
//             .then(({ data }) => {
//                 console.log(data);
//                 dispatch(setRecommendation(data))
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
// }