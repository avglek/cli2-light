import { ofType } from 'redux-observable'
import { catchError, mergeMap, map } from 'rxjs'

import { succesDoc, errorDoc } from '../actions/docAction'
import { DOC_POST } from '../actions/actionsType'

import { cli2xmlServise } from '../../services/cli2xmlService'

export const docEpic = (action$, state$) =>
  action$.pipe(
    ofType(DOC_POST),

    mergeMap((action) =>
      cli2xmlServise(action.payload.xml, state$.value).pipe(
        map((json) => {
          const uid = action.payload.uid
          return succesDoc({ uid, json })
        })
      )
    ),
    catchError((error) => {
      console.log('[cli2 error]:', error)
      errorDoc(error)
    })
  )
