import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SmartTabs from '../components/SmartTabs/SmartTabs'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

//const rq = describe('341297')

const TestPage = () => {
  const classes = useStyles

  return (
    <div className={classes.root}>
      <SmartTabs />
    </div>
  )
}
export default TestPage
