import { combineReducers } from 'redux'
import base from './baseReducer'
import user from './userReducer'
import blog from './blogReducer'

const rootReducer = combineReducers({
  base,
  user,
  blog
})

export default rootReducer
