import { fetchRecommendation } from './fetch_recommendation'
import SET_USER, {POST_LOGIN, SET_ISLOGIN, POST_REGISTER} from './userAction';
import { fetchRestaurant } from './restaurantAction';
import { addFavorite, fetchFavorite, deleteFavorite } from './favoriteAction';

const allActions = {
    fetchRecommendation,
    SET_USER,
    POST_LOGIN,
    POST_REGISTER,
    SET_ISLOGIN,
    fetchRestaurant,
    addFavorite,
    fetchFavorite,
    deleteFavorite,
}

export default allActions