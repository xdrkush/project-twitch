import { combineReducers } from 'redux'
import GithubReducers from './GithubReducers'

const rootReducer = combineReducers({
  github: GithubReducers,
})

export default rootReducer