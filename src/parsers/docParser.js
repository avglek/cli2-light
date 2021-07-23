import { normId } from '../utils/docs'
import { updateTab } from '../store/actions/tabAction'

const getMETA = (ancor, name) =>
  ancor.DOCPROC.CALL.PARAMS.PARAM.find((i) => i.META.name === name)

export const docParser = ({ uid, json }) => {
  const ancor = json.DOC

  const pDoc = getMETA(ancor, 'P_DOCS')
  const pFields = getMETA(ancor, 'P_FIELDS')
  const pSubDocs = getMETA(ancor, 'P_SUB_DOCS')
  const pLookupTables = getMETA(ancor, 'P_LOOKUP_TABLES')

  const columns = pFields.DATA.DATAPACKET.ROWDATA.ROW
  const subDocs = pSubDocs.DATA.DATAPACKET.ROWDATA.ROW
  const lookupTables = pLookupTables.DATA.DATAPACKET.ROWDATA.ROW

  const rows = ancor.CALL.PARAMS.PARAM.DATA.DATAPACKET.ROWDATA.ROW

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW
    const id = Number.parseInt(normId(desc['DOC_ID']))
    const title = desc['DOC_NAME']
    const docClass = desc['DOC_CLASS']

    const item = {
      uid,
      id,
      title,
      loading: false,
      data: {
        docClass,
        subDocs,
        lookupTables,
        columns,
        rows,
      },
    }

    return updateTab(item)
  }

  return updateTab({ uid, loading: false, error: 'no data' })
}
