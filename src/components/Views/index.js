import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { useListView } from '../../ListViewContext'
import GridDocView from './GridDocView'
import ListDocView from './ListDocView'
import { routeToData } from '../../common/constApp'
import { addTab } from '../../store/actions/tabAction'
import { describe } from '../../common/template'
import { postDoc } from '../../store/actions/docAction'

const raw2int = (raw) => Number.parseInt(raw.split('.')[0])

const getDocs = (docs, selected) => {
  const out = docs.filter((i) => {
    return raw2int(i.PARENT_ID) === Number.parseInt(selected.id)
  })
  return out
}

const Views = () => {
  const { list } = useListView()
  const { loading, docs } = useSelector((state) => state.tree)
  //const docItem = useSelector((state) => state.doc)

  const params = useParams()
  const listDocs = getDocs(docs, params)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = (id) => {
    const item = {
      id,
      loading: true,
      title: '',
    }

    dispatch(addTab(item))
    const xml = describe(id)
    dispatch(postDoc(xml))
    history.push(routeToData)
  }

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        {list ? (
          <ListDocView docs={listDocs} onDocClick={handleClick} />
        ) : (
          <GridDocView docs={listDocs} onDocClick={handleClick} />
        )}
      </div>
    )
  }
}

export default Views
