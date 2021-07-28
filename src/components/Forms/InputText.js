import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const InputText = ({ data }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TextField id="standard-basic" label={data['DISPLAY_LABEL']} />
    </div>
  )
}
export default InputText
