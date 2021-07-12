import React, { useContext, useEffect, useState } from 'react'

import { saveStorageObj, readStorageObj } from './localStore'

const ListViewContext = React.createContext()

export const useListView = () => {
  return useContext(ListViewContext)
}

export const ListViewProvider = ({ children }) => {
  const [listView, setListView] = useState(false)

  useEffect(() => {
    const listInit = readStorageObj('list-view')
    const initState = listInit ? listInit.list : false
    setListView(initState)
  }, [])

  const toggle = () =>
    setListView((prev) => {
      saveStorageObj('list-view', { list: !prev })
      return !prev
    })

  return (
    <ListViewContext.Provider
      value={{
        list: listView,
        toggle,
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}
