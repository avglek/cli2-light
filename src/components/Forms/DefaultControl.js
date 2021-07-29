import React from 'react'
import { Typography } from '@material-ui/core'

const DefaultControl = ({ data }) => {
  return <Typography variant="h6">Control N {data['CONTROL_TYPE']}</Typography>
}

export default DefaultControl
