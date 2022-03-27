import React from 'react'
import PropTypes from 'prop-types'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{
        flex:'1 1 auto',
        overflow:'auto',
        display: value === index? 'block': 'none',
        width:'100%',
        height:'100%'}}

      role="tabpanel"
      //hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >

      {/*<div style={{ display: value === index? 'block': 'none',width:'100%',height:'100%',}}>*/}
        {children}
      {/*</div>*/}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default TabPanel


