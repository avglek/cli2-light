import React from 'react'
import {Grid, Input, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import {Controller} from 'react-hook-form'
import MaskedInput from 'react-text-mask/dist/reactTextMask';

const MaskedIP = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/,/\d/, /\d/,/\d/,/\d/,'+',/\d/,/\d/,/\d/,'+',/\d/,/\d/,/\d/,/\d/,/\d/]}
      showMask
      guide
    />
  );
}

const MaskedNV = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/,/\d/, /\d/,/\d/,/\d/,/\d/,/\d/,/\d/]}
      showMask
      guide
    />
  );
}



const useStyles = makeStyles((theme) => ({
  root: {}

}))

const UITextField = ({control,data, ...props}) => {

  console.log('text:',data)

  const renderMask = () =>{
    if(data.name === 'P_IP'){
      return MaskedIP
    }else{
      return MaskedNV
    }
  }

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
      <Controller
        name={data.name}
        control={control}
        render={({ref,field}) => (
            <Input {...field}  inputProps={{'aria-label': 'description'}} inputRef={ref} inputComponent={renderMask()}/>
        )}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default UITextField