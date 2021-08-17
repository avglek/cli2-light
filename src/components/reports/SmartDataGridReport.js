import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Smart, Grid } from 'smart-webcomponents-react/grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '--smart-ui-state-hover': theme.palette.secondary,
  },
}))

const SmartDataGridReport = ({ data, size }) => {
  const classes = useStyles()
  const value = data.data.outdata[0].value

  const behavior = {
    columnResizeMode: 'growAndShrink',
  }

  const appearance = {
    alternationCount: 2,
    //showRowHeader: true,
    //showRowHeaderNumber: true,
    allowHover: true,
    //allowHeaderHover: false,
  }

  // const paging = {
  //   enabled: true,
  // }

  // const pager = {
  //   visible: true,
  // }

  const sorting = {
    enabled: true,
    sortToggleThreeStates: false,
  }

  const selection = {
    enabled: true,
    mode: 'one',
  }

  // const editing = {
  //   enabled: true,
  // }

  const dataSource = new Smart.DataAdapter({
    dataSource: value.rows,
  })

  const realColumns = value.columns.filter((col) => col['FIELD_NAME'])
  const columns = realColumns.map((col) => ({
    label: col['DISPLAY_LABEL'],
    dataField: col['FIELD_NAME'],
    width: 'auto',
  }))

  return (
    <div
      className={classes.root}
      style={{
        '--smart-grid-default-width': '100%',
        '--smart-grid-default-height': `${size.height}px`,
      }}
    >
      <Grid
        dataSource={dataSource}
        columns={columns}
        appearance={appearance}
        behavior={behavior}
        selection={selection}
        // paging={paging}
        // pager={pager}
        sorting={sorting}
        // editing={editing}
      ></Grid>
    </div>
  )
}

export default SmartDataGridReport
