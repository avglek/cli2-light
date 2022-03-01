import { getArray, normId } from '../utils/docs';
import { updateTab } from '../store/actions/tabAction';
import moment from 'moment';

const getMETA = (ancor, name) =>
  ancor.DOCPROC.CALL.PARAMS.PARAM.find((i) => i['META'].name === name);

const getNormalizeColumns = (columns) => {
  const realCol = columns.filter((col) => col['FIELD_NAME']);
  return realCol.map((item) => ({
    name: item['DISPLAY_LABEL'],
    value: item['FIELD_NAME'],
    size: Number.parseInt(item['DISPLAY_SIZE']),
    type: item['fieldtype'],
  }));
};

const getDataValue = (param, descriptionFields = []) => {
  switch (param['META'].datatype) {
    case 'CURSOR':
      if (!param.DATA) return [];
      const fieldsObj = param.DATA.DATAPACKET.METADATA.FIELDS.FIELD;
      const fields = Array.isArray(fieldsObj) ? fieldsObj : [fieldsObj];
      const columns = fields.map((i) => {
        if (Array.isArray(descriptionFields)) {
          const field = descriptionFields.find(
            (t) => t['FIELD_NAME'] === i['attrname']
          );
          return { ...i, ...field };
        } else {
          return { ...i, ...descriptionFields };
        }
      });

      const rows = param.DATA.DATAPACKET.ROWDATA.ROW
        ? getArray(param.DATA.DATAPACKET.ROWDATA.ROW).map((row) => {
            columns.forEach((col) => {
              if (col.fieldtype === 'dateTime') {
                const date = row[col['FIELD_NAME']];
                if (date) {
                  const iso = date.split(':').join('');
                  const dataFormat = col['DISPLAY_FORMAT'];

                  let stringFormatData = dataFormat
                    ? dataFormat.trim().toUpperCase()
                    : 'DD.MM.YY';
                  stringFormatData = stringFormatData.replace('NN', 'mm');
                  stringFormatData = stringFormatData.replace('YY', 'YYYY');

                  row[col['FIELD_NAME']] = moment(iso.slice(0, 13)).format(
                    stringFormatData
                  );
                }
              }
              if (col.fieldtype === 'r8') {
                row[col['FIELD_NAME']] = row[col['FIELD_NAME']]
                  ? Number.parseInt(row[col['FIELD_NAME']])
                  : 0;
              }
            });

            return row;
          })
        : [];

      return {
        rows,
        columns: getNormalizeColumns(columns),
        filterRows: rows,
      };
    case 'CLOB':
      return {
        text: param['DATA'],
      };
    case 'DATE':
      const iso = param['DATA'].slice(0, 13);
      return {
        date: moment(iso).format('DD.MM.YYYY HH:mm'), //20210713T20:01:47000
      };
    case 'VARCHAR':
      return {
        text: param['DATA'],
      };

    default:
      return {};
  }
};

export const docParser = ({ uid, json, value, call, inParams }) => {
  const ancor = json.DOC;
  const pDoc = getMETA(ancor, 'P_DOCS');
  const pFields = getMETA(ancor, 'P_FIELDS');
  const pSubDocs = getMETA(ancor, 'P_SUB_DOCS');
  const pLookupTables = getMETA(ancor, 'P_LOOKUP_TABLES');

  const columns = pFields.DATA.DATAPACKET.ROWDATA.ROW;
  const subDocs = pSubDocs.DATA.DATAPACKET.ROWDATA.ROW;
  const lookupTables = pLookupTables.DATA.DATAPACKET.ROWDATA.ROW;

  const params = ancor.CALL.PARAMS.PARAM.DATA
    ? [ancor.CALL.PARAMS.PARAM]
    : ancor.CALL.PARAMS.PARAM;

  const outdata = params.map((param) => {
    return {
      name: param.META.name,
      datatype: param.META.datatype,
      value: getDataValue(param, columns),
    };
  });

  if (pDoc) {
    const desc = pDoc.DATA.DATAPACKET.ROWDATA.ROW;
    //const meta = pDoc.DATA.DATAPACKET.METADATA.FIELDS.FIELD
    const id = Number.parseInt(normId(desc['DOC_ID']));
    const title = desc['DOC_NAME'];
    const docClass = desc['DOC_CLASS'];
    //const editable =

    const item = {
      uid,
      id,
      title,
      inParams,
      call,
      value,
      titleDoc: desc['DOC_TITLE'],
      loading: false,
      data: {
        docClass,
        subDocs,
        lookupTables,
        outdata,
      },
    };

    Object.keys(item).forEach(
      (key) => item[key] === undefined && delete item[key]
    );

    return updateTab(item);
  }

  return updateTab({
    uid,
    loading: false,
    call,
    value,
    inParams,
    error: 'no data',
  });
};
