import { getArray, normId } from '../utils/docs'
import { updateTab } from '../store/actions/tabAction'
import { postDoc } from '../store/actions/docAction'
import { queryProc } from '../common/template'

export const describeParser = (data) => {
  const ancor = data.DESCRIBE

  const pDoc = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_DOCS'
  )

  const pFields = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_FIELDS'
  )
  let form = null
  if (pFields.DATA.DATAPACKET.ROWDATA !== '') {
    form = getArray(pFields.DATA.DATAPACKET.ROWDATA.ROW)
  }

  const params = getArray(ancor.PARAMS.PARAM).map((i) => i.META)

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW
    const id = Number.parseInt(normId(desc.DOC_ID))
    const item = {
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
      return postDoc(query)
    }
  }
  return updateTab({ loading: false, error: 'no data' })
}
