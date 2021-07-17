import { ofType } from 'redux-observable'
import { catchError, mergeMap, map, delay } from 'rxjs'

import { succesCli2, errorCli2 } from '../actions/cli2Action'
import { CLI2_POST } from '../actions/actionsType'

import { cli2xmlServise } from '../../services/cli2xmlService'

export const cli2xmlEpic = (action$) =>
  action$.pipe(
    ofType(CLI2_POST),

    mergeMap((action) =>
      cli2xmlServise(action.payload).pipe(
        delay(3500),
        map((json) => succesCli2(json))
      )
    ),
    catchError((error) => {
      console.log('[cli2 error]:', error)
      errorCli2(error)
    })
  )
