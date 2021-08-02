import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'

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
  CircularProgress,
  FormHelperText,
} from '@material-ui/core'

import { Visibility, VisibilityOff, MoreHoriz } from '@material-ui/icons'
import clsx from 'clsx'

import { postAuth } from '../../store/actions/authAction'
import WarningMessage from '../../components/WarningMessage'
import { postTree } from '../../store/actions/treeAction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(./static/img/auth.png)`,
    position: 'fixed',
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    color: 'secondary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const resources = [
  'http://localhost:8080/sevstal_ch/servlet/CliServlet',
  'http://192.168.1.143:8080/sevstal_ch/servlet/CliServlet',
  'http://localhost:8080/sevstal/servlet/CliServlet',
  'http://localhost:8080/r65/servlet/CliServlet',
  'http://localhost:8080/storaenso/servlet/CliServlet',
  'http://localhost:8080/akron/servlet/CliServlet',
]

const LoginPage = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    resource: resources[0],
    user: 'OPER_CH',
    password: 'ch11',
    weightRange: '',
    showPassword: false,
    ancorRes: null,
    disabled: false,
    loading: false,
    openWarning: false,
    error: {
      password: false,
      user: false,
      resource: false,
    },
  })

  const { loading, tree } = useSelector((state) => state.tree)
  const { login, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (login) {
      dispatch(postTree())
    }
    if (error) {
      setValues((prev) => ({ ...prev, loading: false, openWarning: true }))
    }
  }, [login, error, dispatch])

  const handleClickMenu = (event) => {
    setValues({ ...values, ancorRes: event.currentTarget })
  }

  const handleCloseMenu = (index) => (event) => {
    setValues({ ...values, resource: resources[index], ancorRes: null })
  }

  const handleChangeValues = (prop) => (event) => {
    const value = event.target.value

    setValues({ ...values, [prop]: value })
  }

  const handleClickShowPassword = (event) => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      user: values.user,
      password: values.password,
      resource: values.resource,
    }
    dispatch(postAuth(formData))
    setValues({ ...values, disabled: true, loading: true })
  }

  const handleCloseWarning = (event) => {
    setValues({
      ...values,
      disabled: false,
      openWarning: false,
      ancorRes: null,
    })
  }

  return (
    <div
      className={classes.root}
      onClick={values.openWarning ? () => handleCloseWarning() : null}
    >
      {login && !loading && tree.length > 0 ? <Redirect to="/" /> : null}
      {error ? (
        <WarningMessage
          open={values.openWarning}
          onClose={handleCloseWarning}
          title="Ошибка авторизации"
          message={error}
          severity="error"
        />
      ) : null}
      <Grid
        className={classes.box}
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography component="h1" variant="h5">
            Вход в систему
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.resources}
                >
                  <InputLabel htmlFor="login-page-resource">
                    Информационный ресурс
                  </InputLabel>
                  <OutlinedInput
                    id="login-page-resource"
                    type="text"
                    value={values.resource}
                    onChange={handleChangeValues('resource')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="select resource"
                          onClick={handleClickMenu}
                          edge="end"
                        >
                          <MoreHoriz />
                        </IconButton>
                        <Menu
                          id="simple-menu"
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
                    aria-describedby="component-resource-text"
                  />
                  <FormHelperText
                    id="component-resource-text"
                    error={values.error.resources}
                  >
                    {values.error.resources
                      ? 'Поле не может быть пустым '
                      : null}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.user}
                >
                  <InputLabel htmlFor="login-page-user">
                    Пользователь
                  </InputLabel>
                  <OutlinedInput
                    id="login-page-user"
                    type={'text'}
                    value={values.user}
                    onChange={handleChangeValues('user')}
                    labelWidth={110}
                    aria-describedby="component-user-text"
                  />
                  <FormHelperText
                    id="component-user-text"
                    error={values.error.user}
                  >
                    {values.error.user ? 'Поле не может быть пустым ' : null}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChangeValues('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
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
                    aria-describedby="component-password-text"
                  />{' '}
                  <FormHelperText
                    id="component-password-text"
                    error={values.error.password}
                  >
                    {values.error.password
                      ? 'Поле не может быть пустым '
                      : null}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  size="large"
                  disabled={values.disabled}
                >
                  Вход
                </Button>
                {values.loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage
