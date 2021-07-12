import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'

import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles'

import ListAltIcon from '@material-ui/icons/ListAlt'
import GridOnIcon from '@material-ui/icons/GridOn'

import { getStyles } from './styles'
import { appTitle } from '../common/constApp'
import TreeDrawer from '../components/Drawer/TreeDrawer'
import AboutDialog from '../components/Dialog/AboutDialog'
import { useListView } from '../ListViewContext'

const MainLayout = (props) => {
  const { window } = props
  const classes = getStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAbout, setIsAbout] = useState(false)
  const history = useHistory()
  const listView = useListView()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    history.push('/login')
  }

  const handleAbout = () => {
    setIsAbout((prev) => !prev)
  }

  const handleToggleView = () => {
    listView.toggle()
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.main}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' noWrap className={classes.title}>
            {appTitle}
          </Typography>
          <IconButton
            color='inherit'
            aria-label='list view'
            onClick={handleToggleView}
          >
            {listView.list ? <GridOnIcon /> : <ListAltIcon />}
          </IconButton>
          <Button color='inherit' onClick={() => history.push('/')}>
            Home
          </Button>
          <Button color='inherit' onClick={handleAbout}>
            About
          </Button>
          <Button color='inherit' onClick={handleLogout}>
            Выход
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            elevation={0}
          >
            <TreeDrawer classes={classes} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <div className={classes.toolbar} />
            <TreeDrawer classes={classes} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AboutDialog open={isAbout} onClose={handleAbout} />
        {props.children}
      </main>
    </div>
  )
}

export default MainLayout
