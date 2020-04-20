import { combineReducers } from 'redux';
import categoryReducer from './category_reducer';
import userReducer from './user_reducer';
import restaurantReducer from './restaurant_reducer';
import favoriteReducer from './favorite_reducer';

const rootReducers = combineReducers({
  category: categoryReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  favorite: favoriteReducer
})

export default rootReducers