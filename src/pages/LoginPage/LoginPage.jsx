import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Menu,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';

import { Visibility, VisibilityOff, MoreHoriz } from '@material-ui/icons';
import clsx from 'clsx';

import { postAuth } from '../../store/actions/authAction';
import WarningMessage from '../../components/WarningMessage';
import { postTree } from '../../store/actions/treeAction';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(./static/img/auth.jpeg)`,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexGrow: 1,
  },

  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    margin: 'auto',
    minWidth: 400,
  },
  box: {
    marginTop: theme.spacing(8),
  },

  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '45ch',
  },
  submit: {
    marginTop: theme.spacing(3),
    width: '40ch',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    color: 'secondary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const resourcePrefix = process.env.REACT_APP_SERVLET_URL + '/';

const resourcePostfix = '/servlet/CliServlet';

const LoginPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    resource: '',
    user: '',
    password: '',
    weightRange: '',
    showPassword: false,
    ancorRes: null,
    disabled: false,
    loading: false,
    openWarning: false,
    error: {
      password: false,
      user: false,
      resource: false,
    },
  });

  const [resources, setResources] = useState([]);

  const { loading, tree } = useSelector((state) => state.tree);
  const { login, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const ls = localStorage.getItem('init');
    const res = JSON.parse(ls);
    setResources((prev) => res || prev);
  }, []);

  useEffect(() => {
    if (login) {
      const prevKey = JSON.parse(localStorage.getItem('init'));
      localStorage.clear();
      if (prevKey) {
        if (
          prevKey.find(
            (key) =>
              key.resource === values.resource && key.user === values.user
          )
        ) {
          localStorage.setItem('init', JSON.stringify([...prevKey]));
        } else {
          localStorage.setItem(
            'init',
            JSON.stringify([
              ...prevKey,
              { resource: values.resource, user: values.user },
            ])
          );
        }
      } else {
        localStorage.setItem(
          'init',
          JSON.stringify([{ resource: values.resource, user: values.user }])
        );
      }
      dispatch(postTree(values.user));
    }
    if (error) {
      setValues((prev) => ({ ...prev, loading: false, openWarning: true }));
    }
  }, [login, error, dispatch, values.error, values.user, values.resource]);

  const handleClickMenu = (event) => {
    setValues({ ...values, ancorRes: event.currentTarget });
  };

  const handleCloseMenu = (index) => () => {
    setValues({
      ...values,
      resource: resources[index].resource,
      user: resources[index].user,
      ancorRes: null,
    });
  };

  const handleChangeValues = (prop) => (event) => {
    const value = event.target.value;

    setValues({ ...values, [prop]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      user: values.user,
      password: values.password,
      resource: resourcePrefix + values.resource + resourcePostfix,
    };
    dispatch(postAuth(formData));
    setValues({ ...values, disabled: true, loading: true });
  };

  const handleCloseWarning = () => {
    setValues({
      ...values,
      disabled: false,
      openWarning: false,
      ancorRes: null,
    });
  };

  return (
    <div
      className={classes.root}
      onClick={values.openWarning ? () => handleCloseWarning() : null}
    >
      {login && !loading && tree.length > 0 ? <Redirect to="/" /> : null}
      {error ? (
        <WarningMessage
          open={values.openWarning}
          onClose={handleCloseWarning}
          title="???????????? ??????????????????????"
          message={error}
          severity="error"
        />
      ) : null}
      <Grid
        className={classes.box}
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography component="h1" variant="h5">
            ???????? ?? ??????????????
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.resources}
                >
                  <InputLabel htmlFor="login-page-resource">
                    ???????????????????????????? ????????????
                  </InputLabel>
                  <OutlinedInput
                    id="login-page-resource"
                    type="text"
                    value={values.resource}
                    onChange={handleChangeValues('resource')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={values.disabled}
                          aria-label="select resource"
                          onClick={handleClickMenu}
                          edge="end"
                        >
                          <MoreHoriz />
                        </IconButton>
                        {resources?.length > 0 && (
                          <Menu
                            id="simple-menu"
                            anchorEl={values.ancorRes}
                            keepMounted
                            open={Boolean(values.ancorRes)}
                            onClose={handleCloseMenu}
                          >
                            {resources.map((item, index) => (
                              <MenuItem
                                key={index}
                                onClick={handleCloseMenu(index)}
                              >
                                {`${item.user}/${item.resource}`}
                              </MenuItem>
                            ))}
                          </Menu>
                        )}
                      </InputAdornment>
                    }
                    labelWidth={200}
                    aria-describedby="component-resource-text"
                  />
                  <FormHelperText
                    id="component-resource-text"
                    error={values.error.resources}
                  >
                    {values.error.resources
                      ? '???????? ???? ?????????? ???????? ???????????? '
                      : null}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.user}
                >
                  <InputLabel htmlFor="login-page-user">
                    ????????????????????????
                  </InputLabel>
                  <OutlinedInput
                    //defaultValue={user}
                    id="login-page-user"
                    type={'text'}
                    value={values.user}
                    onChange={handleChangeValues('user')}
                    labelWidth={110}
                    aria-describedby="component-user-text"
                  />
                  <FormHelperText
                    id="component-user-text"
                    error={values.error.user}
                  >
                    {values.error.user ? '???????? ???? ?????????? ???????? ???????????? ' : null}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  disabled={values.disabled}
                  error={values.error.password}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    ????????????
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    //defaultValue={password}
                    value={values.password}
                    onChange={handleChangeValues('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={values.disabled}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={60}
                    aria-describedby="component-password-text"
                  />{' '}
                  <FormHelperText
                    id="component-password-text"
                    error={values.error.password}
                  >
                    {values.error.password
                      ? '???????? ???? ?????????? ???????? ???????????? '
                      : null}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  size="large"
                  disabled={values.disabled}
                >
                  ????????
                </Button>
                {values.loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
