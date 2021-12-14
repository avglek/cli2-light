import React from 'react'
import {Grid, Input, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import {Controller} from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root: {}

}))




const UITextArea = ({data, control, ...props}) => {

  const classes = useStyles()
  console.log('data:',data)

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <Typography variant="subtitle1" color="primary" align={'center'}>
            {data['DISPLAY_LABEL']}
          </Typography>
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name={data.name}
            render={({ ref,field }) => (
              <TextField
                {...field}
                id="outlined-multiline-static"
                label=""
                multiline
                rows={4}
                variant="outlined"
                ref={ref}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default UITextArea