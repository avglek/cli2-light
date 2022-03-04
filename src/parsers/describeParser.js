import { getArray, normId } from '../utils/docs';
import { updateTab } from '../store/actions/tabAction';
import { postDoc } from '../store/actions/docAction';
import { queryProc } from '../common/template';
import { formPostParser } from './formPostParser';

export const describeParser = ({ uid, json, value }) => {
  const ancor = json.DESCRIBE;

  const pDoc = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_DOCS'
  );

  const pFields = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_FIELDS'
  );

  const pLookupTables = ancor.DOCPROC.CALL.PARAMS.PARAM.find(
    (i) => i.META.name === 'P_LOOKUP_TABLES'
  );

  const lookTables = getArray(pLookupTables.DATA.DATAPACKET.ROWDATA.ROW);

  const params = getArray(ancor.PARAMS.PARAM).map((i) => i.META);

  let form = null;

  if (pFields.DATA.DATAPACKET.ROWDATA !== '') {
    const controls = params.filter((i) => i.type === 'IN');
    const fields = getArray(pFields.DATA.DATAPACKET.ROWDATA.ROW);

    form = controls.map((i) => {
      const f = fields.find((t) => t['FIELD_NAME'] === i.name.slice(2));

      if (f['GROUPED_FIELDS']) {
        const _array = f['GROUPED_FIELDS'].split(';');
        const group = _array.map((g) =>
          fields.find((n) => n['FIELD_NAME'] === g)
        );

        return {
          name: i.name,
          datatype: i.datatype,
          group,
          ...f,
        };
      } else {
        return {
          name: i.name,
          datatype: i.datatype,
          ...f,
        };
      }
    });
  }

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW;
    const id = Number.parseInt(normId(desc.DOC_ID));
    const item = {
      uid,
      id,
      title: desc.DOC_NAME,
      titleResult: desc.DOC_TITLE,
      loading: lookTables ? true : false,
      call: ancor.call,
      params,
      form,
      lookTables,
    };

    if (form) {
      if (value) {
        return formPostParser(uid, item, value);
      }
      return updateTab(item);
    } else {
      const query = queryProc(id, ancor.call, params);
      return postDoc({ uid, xml: query, call: ancor.call, inParams: params });
    }
  }
  return updateTab({ uid, loading: false, error: 'no data' });
};
