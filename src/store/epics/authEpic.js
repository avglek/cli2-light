import { ofType } from 'redux-observable'
import { catchError, mergeMap, map, of } from 'rxjs'

import { succesAuth, errorAuth } from '../actions/authAction'
import { AUTH_POST } from '../actions/actionsType'
import { authServise } from '../../services/authService'
import { authErrors } from '../../common/errorsApp'

export const authEpic = (action$, state$) =>
  action$.pipe(
    ofType(AUTH_POST),
    mergeMap(() =>
      authServise(state$.value).pipe(
        map(() => succesAuth()),
        catchError((error) =>
          of(error).pipe(
            map((err) => {
              let message = authErrors[err.status]
              if (!message) {
                message = 'Неизвестная ошибка'
              }
              return errorAuth(message)
            })
          )
        )
      )
    )
  )
