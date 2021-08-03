import React, { useState } from 'react'
import './SmartTabs.css'

import { Tabs, TabItem } from 'smart-webcomponents-react/tabs'
import { Button } from '@material-ui/core'

const SmartTabs = () => {
  const [items, setItems] = useState([
    { label: 'TAB 0', content: 'Content 0', index: 0, selected: true },
  ])

  const handleClose = (event) => {
    console.log('tab close ', event.detail.index)
    const index = event.detail.index
    setItems((prev) => {
      const clone = prev
      clone.splice(index, 1)
      return [...clone]
    })
  }

  const handleAdd = () => {
    const count = items.length
    setItems((prev) => [
      ...prev,
      {
        label: 'TAB ' + count,
        content: 'Content ' + count,
        index: count,
      },
    ])
  }

  console.log(items)

  return (
    <div>
      <Tabs
        class="demoTabs"
        closeButtons
        onClose={handleClose}
        dataSource={items}
      ></Tabs>
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
}

export default SmartTabs
