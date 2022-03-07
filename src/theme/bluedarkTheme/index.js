import { createTheme } from '@material-ui/core';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#6599C5',
    },
    secondary: {
      main: '#ECBBBB',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
