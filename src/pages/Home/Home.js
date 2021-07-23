import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const normId = (raw) => raw.split('.')[0]

const Home = () => {
  const { loading, tree } = useSelector((state) => state.tree)

  if (!loading && tree.length > 0) {
    const id = normId(tree[0].DOC_ID)
    return <Redirect to={`/view/${id}`} />
  } else {
    return null
  }
}

export default Home
