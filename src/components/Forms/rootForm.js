import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Container, Grid, Paper, TextField, Typography} from '@material-ui/core';
//import UIInputList from './ui-kit/UIInputList';
//import UITextField from './ui-kit/UITextField';
//import UIDataPicker from './ui-kit/UIDataPicker';
import {useForm} from 'react-hook-form';
//import UITextArea from './ui-kit/UITextArea';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {RenderForm} from './GeneratorForm';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    padding: '10px',
  },
  form: {
    overflow: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
//    border:'1px solid red',
  },
  formTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '6rem',
//    border:'1px solid green',
  },
  formBody: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'wrap',
//    border:'1px solid blue',
  },
  formContent: {
    height: '100%',
    flex: '1 1 250px',
    [theme.breakpoints.down('xs')]: {
      //    background: '#8b946f',
      height: '50px',
    },
  },
  formSubmit: {
    height: '2rem',
    flex: '1 1 50px',

  },
  formButton: {
    width: '100%',
    height: '100%',
  },
}))

//^[0-9]+$
const schema = yup.object().shape({})

const defaultConst = {
  VARCHAR: '',
  DATE: Date.now(),
}

const Form = ({id}) => {

  const {items} = useSelector((state) => state.tabs)
  const item = items.find((i) => i.uid === id)
  const params = item.params.filter((i) => i.type === 'IN')

  const defaultParams = params.reduce((acc, item) => {
    return {
      ...acc, [item.name]: defaultConst[item.datatype],
    }
  }, '')
   console.log('item:', item)
  // console.log('params:', params)
  // console.log('default:', defaultParams)

  const {control, handleSubmit, watch, formState: {errors}} = useForm({
    defaultValues: defaultParams,

    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log('out form:', data);
    console.log('call:',item.call)
  }

  const classes = useStyles()


  if (item.loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth={'sm'}>
        <Paper  elevation={3} style={{height:'100%', padding:'20px'}}>
          <div className={classes.form}>
            <div className={classes.formTitle}>
              <Typography variant="h6" color="primary" align={'center'}>
                {item.title}
              </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.formBody}>
              <div className={classes.formContent}>
                <ul style={{listStyle: 'none'}}>
                  {item.form.map((uiControl, index) => {
                    if (uiControl.LOOKUP_TABLE) {
                      //         const lookData = item.lookdata
                    }
                    return (
                      <li key={index}>
                        <RenderForm
                          ui={uiControl}
                          control={control}
                          //look={item.lookdata}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className={classes.formSubmit}>
                <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
                  Отправить
                </Button>
              </div>
            </form>
            {/*</div>*/}
          </div>
        </Paper>
      </Container>
    </div>
  )
}

export default Form