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
