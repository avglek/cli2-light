import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
//import Close from '@material-ui/icons/Close'
import CancelIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'

import { removeTab, changeTab } from '../../store/actions/tabAction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    border: '1 solid red',
  },
}))

const TabLabel = ({ classes, title, onCloseTab }) => {
  return (
    <Grid
      className={classes.label}
      container
      direction='row'
      alignItems='stretch'
      justifyContent='space-between'
      wrap='nowrap'
    >
      <Typography>{title}</Typography>
      <Icon>
        <CancelIcon onClick={onCloseTab} />
      </Icon>
    </Grid>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const TabsViewData = () => {
  const classes = useStyles()
  //const { id } = useParams()

  const { items, value } = useSelector((store) => store.tab)
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    if (newValue < items.length) {
      dispatch(changeTab(newValue))
    }
  }

  const handleRemove = (event, index) => {
    event.stopPropagation()

    if (value === items.length - 1) {
      dispatch(changeTab(value - 1))
    }
    dispatch(removeTab(index))
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='on'
        >
          {items.map((item, index) => {
            return (
              <Tab
                label={
                  <TabLabel
                    classes={classes}
                    title={item.title}
                    onCloseTab={(event) => handleRemove(event, index)}
                  />
                }
                {...a11yProps(index)}
                key={index}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {items.map((item, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            {item.text}
          </TabPanel>
        )
      })}
    </div>
  )
}

export default TabsViewData
