import { combineReducers } from 'redux';
import categoryReducer from './category_reducer';
import userReducer from './user_reducer';
import restaurantReducer from './restaurant_reducer';
import favoritReducer from './favorite_reducer';

const rootReducers = combineReducers({
  category: categoryReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  favorit: favoritReducer
})

export default rootReducers