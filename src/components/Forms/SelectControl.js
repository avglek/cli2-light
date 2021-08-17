import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
    minWidth: 120,
    width: '25rem',
  },
}))

const ITEM_HEIGHT = 24
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const SelectControl = ({ data, look, controlsValue }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleChange = (event) => {
    setValue(event.target.value)

    const value = {
      name: data.name,
      data: event.target.value.trim(),
    }
    controlsValue(value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Typography variant="h5" style={{ marginRight: '2rem' }}>
          {`${data['DISPLAY_LABEL']}:`}
        </Typography>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
          fullWidth
          MenuProps={MenuProps}
        >
          {look.data.map((item, index) => {
            const keyLook = data['LOOKUP_RESULTFIELD']
            return (
              <MenuItem key={index} value={item[keyLook]}>
                {item[keyLook]}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectControl
