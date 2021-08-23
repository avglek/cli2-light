import { createTheme } from '@material-ui/core'

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#8AADEC',
    },
    secondary: {
      main: '#ECBBBB',
    },
  },
}

const theme = createTheme(themeOptions)

export default theme
