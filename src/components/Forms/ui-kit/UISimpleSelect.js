import React from 'react'
import {FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import {Controller} from 'react-hook-form'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const UISimpleSelect = ({control,data,look, ...props}) => {

  console.log('data:',data)
  console.log('look:',look)

  const keyFields = data['LOOKUP_KEYFIELDS']
  const resultFields = data['LOOKUP_RESULTFIELD']

  console.log(keyFields,resultFields)


  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="flex-end" wrap={'nowrap'}>
        <Grid item>
          <Typography variant="subtitle1" color="primary" align={'center'} noWrap>
            {data['DISPLAY_LABEL']}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>

            <Controller
              name={data.name}
              control={control}
              render={({ref,field}) => (

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  ref = {ref}
                  {...field}
                >
                  {
                    look.data.map(lookItem=>(
                      <MenuItem key={lookItem[keyFields]} value={lookItem[keyFields]}>{lookItem[resultFields]}</MenuItem>
                    ))
                  }
                </Select>


              )}/>

          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default UISimpleSelect