import { fetchRecommendation } from './fetch_recommendation'
import SET_USER from './userAction';
import { fetchRestaurant } from './restaurantAction';
import { addFavorite, fetchFavorite, deleteFavorite, changeRefresh } from './favoriteAction';

const allActions = {
    fetchRecommendation,
    SET_USER,
    fetchRestaurant,
    addFavorite,
    fetchFavorite,
    deleteFavorite,
    changeRefresh
}

export default allActions