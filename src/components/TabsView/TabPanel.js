import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { withSize } from 'react-sizeme'

const TabPanel = (props) => {
  const { children, value, index, classes, ...other } = props

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const el = React.cloneElement(child, { size: props.size })
      return el
    }
    return child
  })

  return (
    <div
      className={classes.panel}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          className={classes.box}
          style={{ width: props.size.width, height: '40rem' }}
        >
          {childrenWithProps}
        </Box>
      )}
    </div>
  )
}

export default withSize({ monitorHeight: true })(TabPanel)

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
