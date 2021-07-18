import React from 'react'

import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    zIndex: 2000,
    top: 0,
  },
}))

const WarningMessage = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Collapse in={props.open}>
        <Alert {...props}>
          {props.title ? <AlertTitle>{props.title}</AlertTitle> : null}
          {props.message}
        </Alert>
      </Collapse>
    </div>
  )
}

export default WarningMessage
