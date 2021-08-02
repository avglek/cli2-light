import { replaceTab } from '../store/actions/tabAction'

export const lookupParser = ({ uid, json }) => {
  const data = json.LOOKUP.LOOKUPPARAMS.PARAMS.PARAM.DATA.DATAPACKET.ROWDATA.ROW

  console.log('look data:', uid, data)

  const item = {
    uid,
    loading: false,
    lookdata: data,
  }

  return replaceTab(item)
}
