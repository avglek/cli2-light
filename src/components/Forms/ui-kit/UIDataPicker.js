import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import {Controller} from 'react-hook-form'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  root:{

  },
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

const UIDataPicker = ({data,control,...props}) => {
  const classes = useStyles()
  //const [selectedDate, setSelectedDate] = useState(new Date())

  //console.log('data:',data.name)

  // const handleDateChange = (date) => {
  //   setSelectedDate(date)
  // }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle1" color="primary" className={classes.label} >
          {`${data?data['DISPLAY_LABEL']:'Data'}:`}
        </Typography>
        <div className={classes.date}>
          <Controller
            name={data.name}
            control={control}
            render={({ref,field}) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <KeyboardDatePicker
              {...field}
              autoOk
              fullWidth
              disableToolbar
              variant="inline"
              format="dd.MM.yyyy"
              margin="normal"
              //id={data?data.name:'uid-01'}
              //value={selectedDate}
              //onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              ref={ref}
            />
          </MuiPickersUtilsProvider>
            )}/>
        </div>
      </FormControl>
    </div>
  )
}

export default UIDataPicker
