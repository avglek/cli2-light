import { combineReducers } from 'redux'
import { pingReducer } from './pingReducer'
import { cli2Reducer } from './cli2Reducer'
import { treeReducer } from './treeReducer'
import tabReducer from './tabsReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  ping: pingReducer,
  cli2: cli2Reducer,
  tab: tabReducer,
  tree: treeReducer,
  auth: authReducer,
})

// export default combineReducers({
//   tab: tabReducer,
// })
