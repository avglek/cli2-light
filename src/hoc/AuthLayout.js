import React from 'react'
import { useHistory } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { getStyles } from './styles'
import { appTitle } from '../common/constApp'

const AuthLayout = (props) => {
  const classes = getStyles()
  const history = useHistory()

  const handleLogin = () => {
    history.push('/')
  }

  return (
    <div className={classes.auth}>
      <CssBaseline />
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            {appTitle}
          </Typography>
          <Button color='inherit' onClick={handleLogin}>
            Вход
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

export default AuthLayout
