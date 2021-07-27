import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

const TabPanel = (props) => {
  const { children, value, index, classes, ...other } = props

  return (
    <div
      className={classes.panel}
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={classes.box}>{children}</Box>}
    </div>
  )
}

export default TabPanel

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
