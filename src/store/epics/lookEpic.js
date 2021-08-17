import { ofType } from 'redux-observable'
import { map } from 'rxjs'

import { TAB_UPDATE } from '../actions/actionsType'
import { queryLookTable } from '../../common/template'
import { postDoc } from '../actions/docAction'

export const lookEpic = (action$) =>
  action$.pipe(
    ofType(TAB_UPDATE),

    map(({ payload }) => {
      console.log('map:', payload)
      const { uid, lookTables } = payload
      if (lookTables) {
        const query = queryLookTable(lookTables)
        console.log(query)
        return postDoc({ uid, xml: query })
      }
      return { type: '__NONE__' }
    })
  )
