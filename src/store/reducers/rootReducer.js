import { combineReducers } from 'redux';
import { pingReducer } from './pingReducer';
import { docReducer } from './docReducer';
import { treeReducer } from './treeReducer';
import tabsReducer from './tabsReducer';
import { authReducer } from './authReducer';
import { formReducer } from './formReducer';
import { updateReducer } from './updateReducer';

export const rootReducer = combineReducers({
  ping: pingReducer,
  doc: docReducer,
  tabs: tabsReducer,
  tree: treeReducer,
  auth: authReducer,
  form: formReducer,
  update: updateReducer,
});
