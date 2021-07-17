import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
//import { useDispatch } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'
import theme from './theme/purpleTheme'

import TestPage from './pages/TestPage'
//import MainLayout from './hoc/MainLayout'
import DesktopLayout from './hoc/DesktopLayout'
//import AuthLayout from './hoc/AuthLayout'
import LoginPage from './pages/LoginPage/LoginPage2'
//import Home from './pages/Home/Home'
import Views from './components/Views'
import { ListViewProvider } from './ListViewContext'
import { routeToData } from './common/constApp'
import TabsViewData from './components/Views/TabsViewData'
//import { postTree } from './store/actions/treeAction'

// eslint-disable-next-line
const testLayer = <TestPage />

function App() {
  const [isLogin, setIsLogin] = useState(false)
  //  const dispatch = useDispatch()

  const handleLogin = (login) => {
    //  dispatch(postTree())
    setIsLogin(login)
  }

  return (
    <ListViewProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            path='/login'
            render={() => <LoginPage onLogin={handleLogin} login={isLogin} />}
          />

          {isLogin ? (
            <DesktopLayout>
              <Route exact path='/' component={TestPage} />
              <Route path='/view/:id' component={Views} />
              <Route path={routeToData} component={TabsViewData} />
            </DesktopLayout>
          ) : (
            <Redirect to='/login' />
          )}
        </Switch>
      </ThemeProvider>
    </ListViewProvider>
  )
}

export default App
