import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    listStyle: 'none',
    //border: '1px solid green',
  },
  paper: {
    marginTop: '20px',
    padding: '10px',
  },
}))

const DataPlainText = ({ data, size }) => {
  const classes = useStyles()

  const clob = data.data.outdata[0].value.text
  const text = clob.split('\r')

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {text.map((str, index) => {
          return <div key={index}>{str}</div>
        })}
      </Paper>
    </div>
  )
}

export default DataPlainText
