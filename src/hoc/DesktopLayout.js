import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import clsx from 'clsx'

import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'

import ListAltIcon from '@material-ui/icons/ListAlt'
import GridOnIcon from '@material-ui/icons/GridOn'

import { useStyles } from './styleDesktop'
import { appTitle } from '../common/constApp'
import TreeDrawer from '../components/Drawer/TreeDrawer'
import AboutDialog from '../components/Dialog/AboutDialog'
import { useListView } from '../ListViewContext'

const DesktopLayout = ({ children, onLogin }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [isAbout, setIsAbout] = useState(false)
  const history = useHistory()
  const listView = useListView()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    onLogin(false)
    history.push('/login')
  }

  const handleAbout = () => {
    setIsAbout((prev) => !prev)
  }

  const handleToggleView = () => {
    listView.toggle()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
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
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <TreeDrawer classes={classes} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <AboutDialog open={isAbout} onClose={handleAbout} />
        {children}
      </main>
    </div>
  )
}
export default DesktopLayout
