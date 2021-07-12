import React from 'react'

import { useListView } from '../../ListViewContext'
import GridDocView from './GridDocView'
import ListDocView from './ListDocView'

const Views = () => {
  const { list } = useListView()
  return <div>{list ? <ListDocView /> : <GridDocView />}</div>
}

export default Views
