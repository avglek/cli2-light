import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
//import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Typography } from '@material-ui/core'

/*************************
 *
 * query params = {
 *  name, наименование.
 *  datatype,
 *  type,  // IN/OUT
 *  data
 *
 * }
 */

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
    minWidth: 120,
    width: '40rem',
  },
}))

const str2array = (str) => {
  const arr = str.split('\n')

  return arr
    .filter((i) => i !== '')
    .map((i) => {
      const t = i.split('=')
      return {
        name: t[0],
        value: t[1],
      }
    })
}

export default function SimpleSelect({ data, controlsValue }) {
  const classes = useStyles()
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)

  //console.log('Data:', data)

  const handleChange = (event) => {
    setValue(event.target.value)

    const value = {
      name: data.name,
      data: event.target.value,
    }
    console.log('value:', value)
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
        <Typography variant="h5" style={{ marginRight: '10px' }}>
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
        >
          {str2array(data['ITEM_LIST']).map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}
