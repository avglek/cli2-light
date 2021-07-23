import { ofType } from 'redux-observable'
import { map } from 'rxjs'

import { DOC_SUCCESS } from '../actions/actionsType'
import { parser } from '../../parsers'

export const parserEpic = (action$) =>
  action$.pipe(
    ofType(DOC_SUCCESS),
    map((x) => parser(x.payload))
  )
