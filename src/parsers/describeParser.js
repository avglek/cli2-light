import { getArray, normId } from '../utils/docs'
import { updateTab } from '../store/actions/tabAction'
import { postDoc } from '../store/actions/docAction'
import { queryProc } from '../common/template'

export const describeParser = ({ uid, json }) => {
  const ancor = json.DESCRIBE

  const pDoc = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_DOCS'
  )

  const pFields = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_FIELDS'
  )

  const params = getArray(ancor.PARAMS.PARAM).map((i) => i.META)

  let form = null
  if (pFields.DATA.DATAPACKET.ROWDATA !== '') {
    const controls = params.filter((i) => i.type === 'IN')
    const fields = getArray(pFields.DATA.DATAPACKET.ROWDATA.ROW)

    form = controls.map((i) => {
      const f = fields.find((t) => t['FIELD_NAME'] === i.name.slice(2))

      return {
        name: i.name,
        datatype: i.datatype,
        ...f,
      }
    })
  }

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW
    const id = Number.parseInt(normId(desc.DOC_ID))
    const item = {
      uid,
      id,
      title: desc.DOC_NAME,
      loading: false,
      call: ancor.call,
      params,
      form,
    }

    if (form) {
      return updateTab(item)
    } else {
      const query = queryProc(id, ancor.call, params)
      return postDoc({ uid, xml: query })
    }
  }
  return updateTab({ uid, loading: false, error: 'no data' })
}
