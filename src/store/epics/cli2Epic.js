import { ofType } from 'redux-observable'
import { catchError, mergeMap, tap, map } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import { succesCli2, errorCli2 } from '../actions/cli2Action'
import { CLI2_POST } from '../actions/actionsType'

const user = 'sand'
const password = 'twister'
const host = 'http://localhost:8080/node/grimm/sevstal_ch/'

export const cli2Epic = (action$) =>
  action$.pipe(
    ofType(CLI2_POST),
    tap((x) => console.log('start:', x)),
    mergeMap((action) =>
      ajax
        .getJSON(host + action.payload, {
          Authorization: 'Basic ' + btoa(user + ':' + password),
        })
        .pipe(
          map((response) => succesCli2(response)),
          catchError((error) => {
            console.log('[cli2 error]:', error)
            errorCli2(error)
          })
        )
    )
  )
