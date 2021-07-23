import { ofType } from 'redux-observable'
import { delay, mapTo, take, tap } from 'rxjs'

export const pingEpic = (action$, state$) =>
  action$.pipe(
    tap((x) => console.log('in:', x)),
    ofType('PING'),
    delay(1000),
    // mergeMap((action) =>
    //   state$.pipe(
    //     tap((x) => console.log('state:', x)),
    //     mapTo({ type: 'PONG'})
    //   )
    // ),
    tap((x) => console.log('out:', x)),
    mapTo({ type: 'PONG' }),
    tap((x) => console.log('pong out:', x)),
    take(5)
  )
