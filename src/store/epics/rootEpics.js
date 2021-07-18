import { combineEpics } from 'redux-observable'
import { cli2xmlEpic } from './cli2xmlEpic'
import { pingEpic } from './pingEpic'
import { treeEpic } from './treeEpic'
import { authEpic } from './authEpic'

export const rootEpic = combineEpics(pingEpic, cli2xmlEpic, treeEpic, authEpic)
