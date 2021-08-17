import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: '1rem',
  },
  date: {
    width: '9rem',
  },
}))

const InputDateControl = ({ data }) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <FormControl className={classes.formControl}>
      <Typography variant="h6" className={classes.label}>
        {`${data['DISPLAY_LABEL']}:`}
      </Typography>
      <div className={classes.date}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            //variant="inline"
            format="dd.MM.yyyy"
            margin="normal"
            id={data.name}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </FormControl>
  )
}

export default InputDateControl
