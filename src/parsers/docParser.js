import { normId } from '../utils/docs'
import { updateTab } from '../store/actions/tabAction'
import moment from 'moment'

const getMETA = (ancor, name) =>
  ancor.DOCPROC.CALL.PARAMS.PARAM.find((i) => i.META.name === name)

const getDataValue = (param, descriptionFields = null) => {
  switch (param.META.datatype) {
    case 'CURSOR':
      const fields = param.DATA.DATAPACKET.METADATA.FIELDS.FIELD
      const columns = fields.map((i) => {
        const field = descriptionFields.find(
          (t) => t['FIELD_NAME'] === i['attrname']
        )
        return { ...i, ...field }
      })

      const rows = param.DATA.DATAPACKET.ROWDATA.ROW
        ? param.DATA.DATAPACKET.ROWDATA.ROW.map((row) => {
            columns.forEach((col) => {
              if (col.fieldtype === 'dateTime') {
                const date = row[col['FIELD_NAME']]
                if (date) {
                  const iso = date.split(':').join('')
                  row[col['FIELD_NAME']] = moment(iso.slice(0, 13)).format(
                    'DD.MM.YYYY HH:mm'
                  )
                }
              }
            })

            return row
          })
        : []

      return {
        rows,
        columns,
      }
    case 'CLOB':
      return {
        text: param.DATA,
      }
    case 'DATE':
      const iso = param.DATA.slice(0, 13)
      return {
        date: moment(iso).format('DD.MM.YYYY HH:mm'), //20210713T20:01:47000
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
  //console.log(ancor)
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
      value: getDataValue(param, columns),
    }
  })

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW
    //const meta = pDoc.DATA.DATAPACKET.METADATA.FIELDS.FIELD
    const id = Number.parseInt(normId(desc['DOC_ID']))
    const title = desc['DOC_NAME']
    const docClass = desc['DOC_CLASS']

    const item = {
      uid,
      id,
      title,
      titleDoc: desc['DOC_TITLE'],
      loading: false,
      data: {
        docClass,
        subDocs,
        lookupTables,
        outdata,
      },
    }

    return updateTab(item)
  }

  return updateTab({ uid, loading: false, error: 'no data' })
}
