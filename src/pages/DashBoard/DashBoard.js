import React from 'react'
import Button from '@material-ui/core/Button'

import IconsTest from '../../components/IconsTest/IconsTest'

const DashBoard = () => {
  return (
    <React.Fragment>
      <div>
        <h1>Hello Cli2</h1>
        <IconsTest />
        <Button variant='contained' color='primary'>
          Primary
        </Button>
      </div>
      <h3>Test!!</h3>
    </React.Fragment>
  )
}

export default DashBoard
