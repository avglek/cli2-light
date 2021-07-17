import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Typography,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Menu,
} from '@material-ui/core'

import { Visibility, VisibilityOff, MoreHoriz } from '@material-ui/icons'
import clsx from 'clsx'

//import bgImage from '../../../public/static/img/auth.png'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(./static/img/auth.png)`,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    minWidth: 400,
  },
  box: {
    marginTop: theme.spacing(8),
  },

  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '45ch',
  },
  submit: {
    marginTop: theme.spacing(3),
    width: '40ch',
  },
}))

const resources = [
  'http://localhost:8080/sevstal_ch/servlet/CliServlet',
  'http://localhost:8080/sevstal/servlet/CliServlet',
  'http://localhost:8080/r65/servlet/CliServlet',
  'http://localhost:8080/storaenso/servlet/CliServlet',
  'http://localhost:8080/akron/servlet/CliServlet',
]

const LoginPage = (props) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: '',
    resource: '',
    ancorRes: null,
  })

  const handleClickMenu = (event) => {
    setValues({ ...values, ancorRes: event.currentTarget })
  }

  const handleCloseMenu = (index) => () => {
    setValues({ ...values, resource: resources[index], ancorRes: null })
  }

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.box}
        container
        direction='column'
        justifyContent='space-around'
        alignItems='center'
        spacing={4}
      >
        <Grid item>
          <Typography component='h1' variant='h5'>
            Вход в систему
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container direction='column' spacing={2} alignItems='center'>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'
              >
                <InputLabel htmlFor='login-page-resource'>
                  Информационный ресурс
                </InputLabel>
                <OutlinedInput
                  id='login-page-resource'
                  type='text'
                  value={values.resource}
                  onChange={handleChangeValues('resource')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='select resource'
                        onClick={handleClickMenu}
                        edge='end'
                      >
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        id='simple-menu'
                        anchorEl={values.ancorRes}
                        keepMounted
                        open={Boolean(values.ancorRes)}
                        onClose={handleCloseMenu}
                      >
                        {resources.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={handleCloseMenu(index)}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  }
                  labelWidth={200}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'
              >
                <InputLabel htmlFor='login-page-user'>Пользователь</InputLabel>
                <OutlinedInput
                  id='login-page-user'
                  type={'text'}
                  value={values.user}
                  onChange={handleChangeValues('user')}
                  labelWidth={110}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Пароль
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChangeValues('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                className={classes.submit}
                size='large'
              >
                Вход
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage
