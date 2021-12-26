import { ofType } from 'redux-observable'
import { catchError, mergeMap, map } from 'rxjs'

import { succesDoc, errorDoc } from '../actions/docAction'
import { DOC_POST } from '../actions/actionsType'

import { cli2winxmlServise } from '../../services/cli2winxmlService'

export const docEpic = (action$, state$) =>
  action$.pipe(
    ofType(DOC_POST),

    mergeMap((action) =>
      cli2winxmlServise(action.payload.xml, state$.value).pipe(
        map((json) => {
          const uid = action.payload.uid
          return succesDoc({ uid, json,value:action.payload.value })
        })
      )
    ),
    catchError((error) => {
      console.log('[cli2 error]:', error)
      errorDoc(error)
    })
  )
