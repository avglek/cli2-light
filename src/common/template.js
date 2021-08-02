export const requestTree = `<?xml version="1.0" encoding="Windows-1251"?>
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
                <DATA>OPER_CH</DATA>
            </PARAM>
            <PARAM>
                <META name="p_NCLI" datatype="VARCHAR" type="OUT"/>
            </PARAM>
        </PARAMS>
    </CALL>
</REQUEST>`

export const describe = (
  docId
) => `<?xml version="1.0" encoding="Windows-1251"?>
<REQUEST>
<DESCRIBE
    docid="${docId}"/>
</REQUEST>`

export const queryProc = (id, call, params) => {
  const body = params.reduce((acc, item) => {
    let data = ''
    if (item.data) {
      data = `<DATA>${item.data}</DATA>`
    }
    return (
      acc +
      `<PARAM><META name="${item.name}" datatype="${item.datatype}" type="${item.type}"/>${data}</PARAM>`
    )
  }, '')

  return `<?xml version="1.0" encoding="Windows-1251"?><REQUEST><DOC docid="${id}"><CALL command="${call}" type="proc"><PARAMS>${body}</PARAMS></CALL></DOC></REQUEST>`
}

export const queryLookTable = (tables) => {
  const body = tables.reduce((acc, item) => {
    return acc + `<TABLE name="${item['TABLE_NAME']}"/>`
  }, '')

  return `<?xml version="1.0" encoding="Windows-1251"?><REQUEST><LOOKUP><TABLES>${body}</TABLES></LOOKUP></REQUEST>`
}
