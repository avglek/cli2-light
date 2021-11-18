import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconFormMenu from '../PopupMenus/IconFormMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const InputText = ({ data, look, controlsValue }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [text,setText]=useState('')

  const classes = useStyles()

  const handleChange = (event) => {
    const value = {
      name: data.name,
      data: event.target.value.trim(),
    }
    controlsValue(value)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.target)
  }

  const handlePaste = (text) => {
    setText(text)

    const value = {
      name: data.name,
      data: text.trim(),
    }

    controlsValue(value)

  }

  return (
    <div className={classes.root} onContextMenu={handleClick}>
      <TextField
        id="standard-basic"
        label={data['DISPLAY_LABEL']}
        onChange={handleChange}
        value={text}
      />
      <IconFormMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleSetText={handlePaste}
      />
    </div>
  )
}
export default InputText
