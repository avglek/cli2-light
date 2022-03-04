export const requestTree = (
  user = 'OPER_CH'
) => `<?xml version="1.0" encoding="Windows-1251"?>
<REQUEST>
    <CALL command="begin doc_utils.get_docs_tree(?, ?, ?); ? := common.get_schema_name; end;" type="block">
        <PARAMS>
            <PARAM>
                <META name="p_TREE" datatype="CURSOR" type="OUT"/>
            </PARAM>
            <PARAM>
                <META name="p_DOCS" datatype="CURSOR" type="OUT"/>
            </PARAM>
            <PARAM>
                <META name="p_REMOTE_USER" datatype="VARCHAR" type="IN"/>
                <DATA>${user}</DATA>
            </PARAM>
            <PARAM>
                <META name="p_NCLI" datatype="VARCHAR" type="OUT"/>
            </PARAM>
        </PARAMS>
    </CALL>
</REQUEST>`;

export const describe = (
  docId
) => `<?xml version="1.0" encoding="Windows-1251"?>
<REQUEST>
<DESCRIBE
    docid="${docId}"/>
</REQUEST>`;

export const queryProc = (id, call, params) => {
  const body = params?.reduce((acc, item) => {
    let data = '';
    if (item.data) {
      data = `<DATA>${item.data}</DATA>`;
    }
    return (
      acc +
      `<PARAM><META name="${item.name}" datatype="${item.datatype}" type="${item.type}"/>${data}</PARAM>`
    );
  }, '');

  return `<?xml version="1.0" encoding="Windows-1251"?><REQUEST><DOC docid="${id}"><CALL command="${call}" type="proc"><PARAMS>${body}</PARAMS></CALL></DOC></REQUEST>`;
};

export const queryLookTable = (tables) => {
  const body = tables.reduce((acc, item) => {
    return acc + `<TABLE name="${item['TABLE_NAME']}"/>`;
  }, '');

  return `<?xml version="1.0" encoding="Windows-1251"?><REQUEST><LOOKUP><TABLES>${body}</TABLES></LOOKUP></REQUEST>`;
};
//`<ROW RowState="2" NV="29200011" CODE="24  " ROWID="ABHRDMAAHAACETHAAA" nullfields="2"/>`
const getXMLRow = (row) => {
  const keys = Object.keys(row);
  let body = '<ROW ';
  for (const key of keys) {
    if (key === 'id') continue;
    body = body + `${key}="${row[key]}" `;
  }
  return body + '/>';
};

export const queryUpdate = (id, table, fields, rowdata) => {
  return `<?xml version="1.0" encoding="Windows-1251"?>
<REQUEST>
 <UPDATE>
  <cdsDoc table="${table}" keyfield="ROWID">
   <DATAPACKET Version="2.0">
    <METADATA>
     <FIELDS>
     ${fields?.reduce((acc, field) => {
       return (
         acc +
         `<FIELD attrname="${field.value}" fieldtype="${field.type}" SUBTYPE="FixedChar" WIDTH="${field.size}" returning="yes"/>`
       );
     }, '')}
      <FIELD attrname="TS_LOAD" fieldtype="dateTime"/>
      <FIELD attrname="ROWID" fieldtype="string" WIDTH="18"/>
     </FIELDS>
     <PARAMS DATASET_DELTA="1"/>
    </METADATA>
    <ROWDATA>
    ${rowdata?.reduce((acc, row) => {
      return acc + getXMLRow(row);
    }, '')}
    </ROWDATA>
   </DATAPACKET>
  </cdsDoc>
 </UPDATE>
</REQUEST>`;
};

export const createXmlErrorMessage = (message) => {
  return `<?xml version="1.0" encoding="UTF-8"?><EXCEPTION message="${message}" />`;
};
