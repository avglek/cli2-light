import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid } from '@material-ui/core'

import { queryProc } from '../common/template'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

//const rq = describe('341297')

const TestPage = () => {
  const classes = useStyles

  const handleClick = () => {
    const params = [
      {
        name: 'p_Doc',
        datatype: 'cursor',
        type: 'out',
      },
      {
        name: 'param_2',
        datatype: 'varchar',
        type: 'in',
        data: '22222222',
      },
      {
        name: 'param_3',
        datatype: 'varchar',
        type: 'in',
        data: '50',
      },
    ]

    const query = queryProc('45332', 'test(?,?,?)', params)
    console.log(query)
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
          <Button variant='contained' color='primary' onClick={handleClick}>
            Test Cli Request
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
export default TestPage
