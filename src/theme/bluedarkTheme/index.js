import { createTheme } from '@material-ui/core';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#6599C5',
    },
    secondary: {
      main: '#de8282',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
