import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
//import { useDispatch } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles'
import theme from './theme/purpleTheme'

import MainLayout from './hoc/MainLayout'
import LoginPage from './pages/LoginPage/LoginPage'

import Views from './components/Views'
import { ListViewProvider } from './ListViewContext'
import { routeToData } from './common/constApp'
import TabsViewData from './components/TabsView/TabsViewData'
import { useSelector } from 'react-redux'
import Home from './pages/Home/Home'
//import TestPage from './pages/TestPage'
//${this.props.location.pathname}

const App = () => {
  const { login } = useSelector((state) => state.auth)

  return (
    <ListViewProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/test" component={MainLayout} />
          <Route path="/login" component={LoginPage} />
          {login ? (
            <MainLayout>
              <Route exact path="/" component={Home} />
              <Route path="/view/:id" component={Views} />
              <Route path={routeToData} component={TabsViewData} />
            </MainLayout>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </ThemeProvider>
    </ListViewProvider>
  )

  //return <TestPage />
}

export default App
