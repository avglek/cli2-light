import React from 'react'
import { useSelector } from 'react-redux'

export const RenderData = () => {
  const { items } = useSelector((state) => state.tabs)

  console.log('items:', items)

  return <div>Render data</div>
}
