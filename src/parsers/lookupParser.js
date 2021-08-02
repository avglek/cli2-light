import { updateTab } from '../store/actions/tabAction'

export const lookupParser = ({ uid, json }) => {
  console.log('look json:', json)
  const data = json.LOOKUP.LOOKUPPARAMS.PARAMS.PARAM.DATA.DATAPACKET.ROWDATA.ROW
  const meta = json.LOOKUP.LOOKUPPARAMS.PARAMS.PARAM.META.name

  const item = {
    uid,
    loading: false,
    lookdata: { meta, data },
  }

  return updateTab(item)
}
