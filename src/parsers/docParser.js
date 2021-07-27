import { normId } from '../utils/docs'
import { updateTab } from '../store/actions/tabAction'

const getMETA = (ancor, name) =>
  ancor.DOCPROC.CALL.PARAMS.PARAM.find((i) => i.META.name === name)

const getDataValue = (param) => {
  switch (param.META.datatype) {
    case 'CURSOR':
      return {
        rows: param.DATA.DATAPACKET.ROWDATA,
      }
    case 'CLOB':
      return {
        text: param.DATA,
      }
    case 'DATE':
      return {
        date: param.DATA, //20210713T20:01:47000
      }
    case 'VARCHAR':
      return {
        text: param.DATA,
      }

    default:
      return {}
  }
}

export const docParser = ({ uid, json }) => {
  const ancor = json.DOC
  console.log('ancor:', ancor)

  const pDoc = getMETA(ancor, 'P_DOCS')
  const pFields = getMETA(ancor, 'P_FIELDS')
  const pSubDocs = getMETA(ancor, 'P_SUB_DOCS')
  const pLookupTables = getMETA(ancor, 'P_LOOKUP_TABLES')

  const columns = pFields.DATA.DATAPACKET.ROWDATA.ROW
  const subDocs = pSubDocs.DATA.DATAPACKET.ROWDATA.ROW
  const lookupTables = pLookupTables.DATA.DATAPACKET.ROWDATA.ROW

  const params = ancor.CALL.PARAMS.PARAM.DATA
    ? [ancor.CALL.PARAMS.PARAM]
    : ancor.CALL.PARAMS.PARAM

  const outdata = params.map((param) => {
    return {
      name: param.META.name,
      datatype: param.META.datatype,
      value: getDataValue(param),
    }
  })

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
        outdata,
      },
    }
    console.log('i:', item)
    return updateTab(item)
  }

  return updateTab({ uid, loading: false, error: 'no data' })
}
