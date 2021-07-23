import { combineReducers } from 'redux'
import { pingReducer } from './pingReducer'
import { docReducer } from './docReducer'
import { treeReducer } from './treeReducer'
import tabReducer from './tabsReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  ping: pingReducer,
  doc: docReducer,
  tab: tabReducer,
  tree: treeReducer,
  auth: authReducer,
})
