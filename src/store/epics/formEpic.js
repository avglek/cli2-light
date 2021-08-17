import { ofType } from 'redux-observable'
import { map } from 'rxjs'

import { FORM_SUBMIT } from '../actions/actionsType'
import { queryProc } from '../../common/template'
import { postDoc } from '../actions/docAction'

export const formEpic = (action$) =>
  action$.pipe(
    ofType(FORM_SUBMIT),

    //tap((x) => console.log('post form', x)),
    map(({ payload }) => {
      const { id, uid, call, params } = payload
      const query = queryProc(id, call, params)

      return postDoc({ uid, xml: query })
    })
  )
