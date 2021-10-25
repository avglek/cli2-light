export const normId = (raw) => raw.split('.')[0]

export const raw2int = (raw) => Number.parseInt(raw.split('.')[0])

export const rem2pix = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export const getArray = (value) => {
  if (!value) {
    return value
  }
  if (Array.isArray(value)) {
    return value
  } else {
    return new Array(value)
  }
}

export const parseDescribe = (data) => {
  const ancor = data.DESCRIBE
  if (!ancor) {
    return data
  }
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

  const params = getArray(ancor.PARAMS.PARAM)

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW
    const item = {
      id: Number.parseInt(normId(desc.DOC_ID)),
      title: desc.DOC_NAME,
      loading: false,
      call: ancor.call,
      params,
      form,
    }
    return item
  }
  return { loading: false, error: 'no data' }
}

export const parseForm = (data) => {}

export const parseDoc = (data) => {
  const ancor = data.DOC
  if (!ancor) {
    return data
  }

  return { loading: false, error: 'no data' }
}
