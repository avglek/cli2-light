export const treeDoc =
  'http://172.16.10.3:8989/grimm/sevstal_ch/common.doc_utils.get_docs_tree?doc_tree&doc_docs&remoteuser=OPER_CH'

export const docProc = (docId) =>
  `http://172.16.10.3:8989/grimm/sevstal_ch/common.doc_utils.doc_proc?id=${docId}&fls&user_id=OPER_CH&docs&doc_fild&doc_sub&doc_tab&doc_filter`
