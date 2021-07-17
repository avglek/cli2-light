import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

//import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { postTree } from '../../store/actions/treeAction'
import { Paper } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    // //    backgroundImage: 'url(' + './static/img/auth.jpeg' + ')',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  },

  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fabProgress: {
    color: 'secondary',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: 'secondary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  box: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}))

const LoginPage = ({ login, onLogin }) => {
  const classes = useStyles()
  const { loading, items } = useSelector((state) => state.tree)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && items.length > 0) {
      onLogin(true)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postTree())
  }

  const handleLink = (event) => {
    event.preventDefault()
    onLogin(true)
  }

  return (
    <div className={classes.root}>
      {login ? <Redirect to='/' /> : null}
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Вход в систему
          </Typography>
          <Paper className={classes.box} variant='outlined' square>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='url'
                label='Информационный ресурс'
                name='url'
                autoComplete='url'
                autoFocus
                disabled={loading}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='user'
                label='Пользователь'
                name='user'
                autoComplete='email'
                autoFocus
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='current-password'
                disabled={loading}
                size='small'
              />

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
                disabled={loading}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={loading}
              >
                Вход
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              <Grid container>
                <Grid item xs>
                  <Link href='#' onClick={handleLink} variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  )
}

export default LoginPage
