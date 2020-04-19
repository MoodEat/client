import { combineReducers } from 'redux';
import categoryReducer from './category_reducer'

const rootReducers = combineReducers({
  categoryReducer: categoryReducer
})

export default rootReducers