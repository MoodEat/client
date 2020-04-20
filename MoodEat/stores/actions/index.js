import { fetchRecommendation } from './fetch_recommendation'
import SET_USER from './userAction';
import { fetchRestaurant } from './restaurantAction';
import { addFavorite } from './favoriteAction';

const allActions = {
    fetchRecommendation,
    SET_USER,
    fetchRestaurant,
    addFavorite
}

export default allActions