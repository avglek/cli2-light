import { ofType } from 'redux-observable'
import { catchError, mergeMap, map} from 'rxjs'

import { succesTree, errorTree } from '../actions/treeAction'
import { TREE_POST } from '../actions/actionsType'
import { cli2xmlServise } from '../../services/cli2xmlService'

const raw2int = (raw) => Number.parseInt(raw.split('.')[0])

const getMetaData = (meta, data) => {
  return data
    ? data.CALL.PARAMS.PARAM.filter((item) => item.META.name === meta)
    : undefined
}

const getTreeArray = (rawdata) => {
  if (!rawdata) {
    return []
  }

  const data = rawdata[0].DATA.DATAPACKET.ROWDATA.ROW
  const out = []

  data.sort((a, b) => raw2int(a.LEV) - raw2int(b.LEV))

  data.forEach((item) => {
    const parent = item.PARENT_ID
    const t = out.find((i) => i.DOC_ID === parent)
    if (t) {
      t.child.push(item)
    } else {
      const obj = { ...item, child: [] }
      out.push(obj)
    }
  })

  return out.sort((a, b) => raw2int(a.ORDERING) - raw2int(b.ORDERING))
}

const getDocsArray = (rawdata) => {
  if (!rawdata) {
    return []
  }

  const data = rawdata[0].DATA.DATAPACKET.ROWDATA.ROW.map((item) => ({
    ...item,
    ORDERING: item.ORDERING ? item.ORDERING : '0.0',
  }))

  return data.sort((a, b) => raw2int(a.ORDERING) - raw2int(b.ORDERING))
}

export const treeEpic = (action$, state$) =>
  action$.pipe(
    ofType(TREE_POST),

    mergeMap((action) =>
      cli2xmlServise(action.payload, state$.value).pipe(
        map((data) => {
          const rawDataTree = getMetaData('p_TREE', data)
          const rawDataDocs = getMetaData('p_DOCS', data)

          return {
            tree: getTreeArray(rawDataTree),
            docs: getDocsArray(rawDataDocs),
          }
        }),
        //delay(3500),
        map((data) => {
          return succesTree(data)
        })
      )
    ),
    catchError((error) => {
      console.log('[cli2 error]:', error)
      errorTree(error)
    })
  )
