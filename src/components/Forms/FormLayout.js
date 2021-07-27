import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}))

const FormLayout = (props)=>{
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

export default FormLayout