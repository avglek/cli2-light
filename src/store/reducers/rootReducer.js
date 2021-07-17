import { combineReducers } from 'redux'
import { pingReducer } from './pingReducer'
import { cli2Reducer } from './cli2Reducer'
import { treeReducer } from './treeReducer'
import tabReducer from './tabsReducer'

export const rootReducer = combineReducers({
  ping: pingReducer,
  cli2: cli2Reducer,
  tab: tabReducer,
  tree: treeReducer,
})

// export default combineReducers({
//   tab: tabReducer,
// })
