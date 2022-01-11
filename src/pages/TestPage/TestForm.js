import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RenderForm } from './TestGeneratorForm';
import moment from 'moment';
import { submitForm } from '../../store/actions/formAction';
import { clearTab } from '../../store/actions/tabAction';
import { ref_191303 } from './params';

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
  },
  formTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '6rem',
  },
  formBody: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  formContent: {
    height: '100%',
    flex: '1 1 250px',
    [theme.breakpoints.down('xs')]: {
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
  listContainer: {
    listStyle: 'none',
  },
  listItem: {
    marginBottom: '20px',
  },
}));

const schema = yup.object().shape({});

const defaultConst = {
  VARCHAR: '',
  DATE: Date.now(),
};

const TestForm = () => {
  const item = ref_191303;
  console.log('current item:', item);

  const params = item.params.filter((i) => i.type === 'IN');

  const defaultParams = params.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: defaultConst[item.datatype],
    };
  }, '');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultParams,

    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log('Submit:', data);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth={'sm'}>
        <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
          <div className={classes.form}>
            <div className={classes.formTitle}>
              <Typography variant="h6" color="primary" align={'center'}>
                {item.title}
              </Typography>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.formBody}
            >
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
                        />
                      </li>
                    );
                  })}
                </ul>
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
            {/*</div>*/}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default TestForm;
