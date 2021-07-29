import { ofType } from 'redux-observable'
import { map, tap } from 'rxjs'

import { FORM_SUBMIT } from '../actions/actionsType'

export const formEpic = (action$) =>
  action$.pipe(
    ofType(FORM_SUBMIT),

    tap((x) => console.log('post form', x)),
    map(({ payload }) => {
      console.log('map:', payload)
      return { type: '__NONE__' }
    })
  )
