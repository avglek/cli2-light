import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

import { raw2int, rem2pix } from '../../utils/docs'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '40rem',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}))

const DataGridReport = ({ data }) => {
  const classes = useStyles()
  const getSize = (value) => rem2pix(raw2int(value))

  const value = data.data.outdata[0].value

  console.log('value:', value)

  const icolumns = value.columns.map((col) => ({
    field: col['FIELD_NAME'],
    headerName: col['DISPLAY_LABEL'],
    width: getSize(col['DISPLAY_SIZE'] || '5.0'),
  }))

  const irows = value.rows.map((row, index) => ({ id: index, ...row }))

  return (
    <div className={classes.root}>
      <DataGrid
        rows={irows}
        columns={icolumns}
        headerHeight={48}
        autoPageSize={false}
        autoHeight={false}
      />
    </div>
  )
}

export default DataGridReport
