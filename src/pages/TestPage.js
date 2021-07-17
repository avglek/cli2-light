import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { postTree } from '../store/actions/treeAction'
//import { requestTree } from '../services/cliService/template'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

//const rq = describe('341297')

const TestPage = () => {
  const classes = useStyles
  const state = useSelector((state) => state.tree)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    //  console.log('[cli2:state]:', state)
    setDisabled(false)
    if (!state.loading && state.items.lenght !== 0) {
      //    console.log('[cli2:done]', state.items)
    }
  }, [state])

  const handleClick = () => {
    setDisabled(true)

    dispatch(postTree())
  }

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
        <Grid item xs={4}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleClick}
            disabled={disabled}
          >
            Test Cli Request
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Paper variant='outlined'>test</Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default TestPage
