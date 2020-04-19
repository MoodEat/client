import { combineReducers } from 'redux';
// import categoryReducer from './category_reducer'
import userReducer from './user_reducer'

const rootReducers = combineReducers({
  // categoryReducer: categoryReducer,
  user: userReducer
})

export default rootReducers