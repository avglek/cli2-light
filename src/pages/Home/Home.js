import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const Home = () => {
  const classes = useStyles

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='column'
        spacing={3}
        justifyContent='flex-start'
        alignItems='center'
      >
        <Grid item xs={4}>
          <h1>Welcom to Cli2-light</h1>
        </Grid>
      </Grid>
    </div>
  )
}
export default Home
