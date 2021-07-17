import { createTheme } from '@material-ui/core'

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#8a41b4',
    },
    secondary: {
      main: '#f50057',
    },
  },
}

const theme = createTheme(themeOptions)

export default theme
