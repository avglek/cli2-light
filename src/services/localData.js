import data from '../__mocks__/data/doc_tree_response.json'

export const raw2int = (raw) => Number.parseInt(raw.split('.')[0])

const getMetaData = (meta) => {
  return data.CALL.PARAMS.filter((item) => item.META.name === meta)
}

export function getTreeDoc() {
  const obj = getMetaData('p_TREE')
  if (obj.length > 0) {
    const rawArray = obj[0].DATA.DATAPACKET.ROWDATA
    return createTreeObj(rawArray)
  }
  return []
}

function createTreeObj(data) {
  const out = []

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

export function getDocs(numDoc) {
  const obj = getMetaData('p_DOCS')
  if (obj.length > 0) {
    const rawArray = obj[0].DATA.DATAPACKET.ROWDATA
    const out = rawArray.filter((i) => {
      if (!i.ORDERING) {
        i.ORDERING = '0.0'
      }
      return raw2int(i.PARENT_ID) === Number.parseInt(numDoc)
    })
    return out.sort((a, b) => raw2int(a.ORDERING) - raw2int(b.ORDERING))
  }
  return []
}
