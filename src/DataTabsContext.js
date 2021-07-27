import React, { useContext, useEffect, useState } from 'react'

import { saveStorageObj, readStorageObj } from './localStore'

const DataTabsContext = React.createContext()

export const useDataTabs = () => {
  return useContext(DataTabsContext)
}

export const DataTabsProvider = ({ children }) => {
  const [DataTabs, setDataTabs] = useState([])

  useEffect(() => {
    const listInit = readStorageObj('data-tabs-view')
    const initState = listInit ? listInit.list : false
    setDataTabs(initState)
  }, [])

  const addTab = (tabObj) =>
    setDataTabs((prev) => {
      const res = [...prev, tabObj]
      saveStorageObj('data-tabs-view', JSON.stringify(res))
      return res
    })

  // const removeTab = () => {
  //   console.log()
  // }

  return (
    <DataTabsContext.Provider
      value={{
        list: DataTabs,
        addTab,
      }}
    >
      {children}
    </DataTabsContext.Provider>
  )
}
