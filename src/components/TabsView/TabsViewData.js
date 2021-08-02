import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'

import { removeTab, changeTab } from '../../store/actions/tabAction'
import { useStyles, a11yProps } from './styles'
import TabPanel from './TabPanel'
import TabLabel from './TabLabel'
import Form from '../Forms'
import RenderData from '../reports'
//import { useStyles as useLayoutStyles } from '../../hoc/styleMainLayout'

const TabsViewData = () => {
  const classes = useStyles()
  //const layoutClasses = useLayoutStyles()

  const { items, count } = useSelector((store) => store.tabs)
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    if (newValue < items.length) {
      dispatch(changeTab(newValue))
    }
  }

  const handleRemove = (event, index) => {
    event.stopPropagation()

    if (count === items.length - 1) {
      dispatch(changeTab(count - 1))
    }
    dispatch(removeTab(index))
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} color="default">
        <Tabs
          value={count}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          {items.map((item, index) => {
            return (
              <Tab
                label={
                  <TabLabel
                    classes={classes}
                    onCloseTab={(event) => handleRemove(event, index)}
                  >
                    {item.loading ? (
                      <>
                        <CircularProgress size={20} /> Загрузка...
                      </>
                    ) : (
                      item.title
                    )}
                  </TabLabel>
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
          <TabPanel
            value={count}
            index={index}
            key={item.uid}
            classes={classes}
          >
            {item.form ? <Form id={item.uid} /> : null}
            {item.data ? <RenderData id={item.uid} /> : null}
          </TabPanel>
        )
      })}
    </div>
  )
}

export default TabsViewData
