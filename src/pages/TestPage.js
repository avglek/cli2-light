import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper } from '@material-ui/core'

//import { useDispatch, useSelector } from 'react-redux'
//import { postTree } from '../store/actions/treeAction'
import WarningMessage from '../components/WarningMessage'
//import { requestTree } from '../services/cliService/template'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

//const rq = describe('341297')

const TestPage = () => {
  const classes = useStyles
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    setDisabled(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <WarningMessage
        open={open}
        onClose={handleClose}
        title='Ошибка авторизации'
        message='Пользователь с таким именем в системе не зарегистрирован. Проверьте правильность ввода'
        severity='error'
      />
      <Grid
        container
        direction='column'
        spacing={3}
        justifyContent='flex-start'
        alignItems='center'
      >
        <Grid item xs={4}>
          <h1>Welcom to Cli2-light</h1>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleClick}
            disabled={disabled}
          >
            Test Cli Request
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Paper variant='outlined'>test</Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default TestPage
