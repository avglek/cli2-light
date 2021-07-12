import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

import TestPage from './pages/TestPage'
import MainLayout from './hoc/MainLayout'
import AuthLayout from './hoc/AuthLayout'
import LoginPage from './pages/LoginPage/LoginPage'
import Home from './pages/Home/Home'
import Views from './components/Views'
import { ListViewProvider } from './ListViewContext'

// eslint-disable-next-line
const testLayer = <TestPage />

function App() {
  return (
    <ListViewProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path='/login'>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </Route>
          <MainLayout>
            <Route exact path='/' component={Home} />
            <Route path='/view/:id' component={Views} />
          </MainLayout>
        </Switch>
      </ThemeProvider>
    </ListViewProvider>
  )
}

export default App
