import { combineEpics } from 'redux-observable';
import { docEpic } from './docEpic';
//import { pingEpic } from './pingEpic'
import { treeEpic } from './treeEpic';
import { authEpic } from './authEpic';
import { parserEpic } from './parserEpic';
import { formEpic } from './formEpic';
import { lookEpic } from './lookEpic';
import { updateEpic } from './updateEpic';

export const rootEpic = combineEpics(
  //pingEpic,
  docEpic,
  treeEpic,
  authEpic,
  parserEpic,
  formEpic,
  lookEpic,
  updateEpic
);
