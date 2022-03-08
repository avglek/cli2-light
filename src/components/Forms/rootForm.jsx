import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RenderForm } from './GeneratorForm';
import moment from 'moment';
import { submitForm } from '../../store/actions/formAction';
import { clearTab } from '../../store/actions/tabAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: '40px',
  },
  form: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  formTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '96px',
    padding: '0 20px',
  },
  formBody: {
    flexGrow: '1',
    minHeight: '120px',
    maxHeight: '100%',
    overflow: 'auto',
    //display: 'flex',
    //flexDirection: 'row',
    //alignItems: 'stretch',
    //flexWrap: 'wrap',
  },
  formContent: {
    height: '100%',

    //    flex: '1 1 250px',
    [theme.breakpoints.down('xs')]: {
      height: '50px',
    },
    //paddingRight: '40px',
  },
  formSubmit: {
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formButton: {
    width: '140px',
    height: '36px',
  },
  listContainer: {
    listStyle: 'none',
  },
  listItem: {
    marginBottom: '20px',
  },
}));

const schema = yup.object().shape({});

const Form = ({ id }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.tabs);
  const item = items.find((i) => i.uid === id);

  //  const params = item.params.filter((i) => i.type === 'IN');

  // const defaultParams = params.reduce((acc, item) => {
  //   return {
  //     ...acc,
  //     [item.name]: defaultConst[item.datatype],
  //   };
  // }, '');

  const {
    control,
    handleSubmit,
    // formState: {
    //   errors
    // },
    setValue,
  } = useForm({
    // defaultValues: defaultParams,

    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    const params = item.params.map((i) => {
      let findData = data[i.name];

      if (i.datatype === 'DATE')
        findData = moment(findData).format('YYYYMMDDT00:00:0000');
      if (i.name === 'P_NVS') findData = findData.split('\n').join(';');

      return findData ? { ...i, data: findData } : i;
    });

    const reqData = {
      uid: item.uid,
      id: item.id,
      call: item.call,
      params,
    };

    console.log('send:', reqData);

    dispatch(submitForm(reqData));
    dispatch(clearTab({ uid: item.uid, title: 'result', call: reqData.call }));
  };

  const classes = useStyles();

  if (item.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth={'sm'}>
        <Paper elevation={5} className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formTitle}>
              <Typography variant="h6" color="primary" align={'center'}>
                {item.title}
              </Typography>
            </div>
            <div className={classes.formBody}>
              <div className={classes.formContent}>
                <ul className={classes.listContainer}>
                  {item.form.map((uiControl, index) => {
                    if (uiControl.LOOKUP_TABLE) {
                      //         const lookData = item.lookdata
                    }
                    return (
                      <li className={classes.listItem} key={index}>
                        <RenderForm
                          ui={uiControl}
                          control={control}
                          look={item.lookdata}
                          setValue={setValue}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={classes.formSubmit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.formButton}
              >
                Отправить
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Form;
