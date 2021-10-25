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

const InputText = ({ data, look, controlsValue }) => {
  const classes = useStyles()

  const handleChange = (event) => {
    const value = {
      name: data.name,
      data: event.target.value.trim(),
    }
    controlsValue(value)
  }

  return (
    <div className={classes.root}>
      <TextField
        id="standard-basic"
        label={data['DISPLAY_LABEL']}
        onChange={handleChange}
      />
    </div>
  )
}
export default InputText
