import { combineEpics } from 'redux-observable'
import { docEpic } from './docEpic'
//import { pingEpic } from './pingEpic'
import { treeEpic } from './treeEpic'
import { authEpic } from './authEpic'
import { parserEpic } from './parserEpic'

export const rootEpic = combineEpics(
  //pingEpic,
  docEpic,
  treeEpic,
  authEpic,
  parserEpic
)
