import React from 'react'
//import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
//import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
//import Checkbox from '@material-ui/core/Checkbox'
//import Chip from '@material-ui/core/Chip'
import { Button, Grid, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: '1px solid red',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
  },
}))

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

const title = 'Список вагонов'

const InputList = () => {
  const classes = useStyles()

  const [personName, setPersonName] = React.useState([])

  const handleChangeMultiple = (event) => {
    const { options } = event.target
    const value = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setPersonName(value)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={4}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid
          item
          container
          direction='column'
          xs={6}
          className={classes.block1}
        >
          <TextField id='standard-basic' label='Standard' />
          <FormControl className={classes.formControl}>
            <Select
              multiple
              native
              value={personName}
              onChange={handleChangeMultiple}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {names.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          container
          direction='column'
          xs={2}
          className={classes.block1}
        >
          <Button color='primary' variant='contained'>
            Add
          </Button>
          <Button color='secondary' variant='contained'>
            Remove
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default InputList
