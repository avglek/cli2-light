import { ofType } from 'redux-observable'
import { delay, mapTo } from 'rxjs'

export const pingEpic = (action$) =>
  action$.pipe(ofType('PING'), delay(1000), mapTo({ type: 'PONG' }))
