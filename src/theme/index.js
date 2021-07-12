import { colors } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
// import { red } from '@material-ui/core/colors'
// import shadows from './shadows'
// import typography from './typography'

// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#F4F6F8',

//       paper: colors.common.white,
//     },
//     primary: {
//       contrastText: '#ffffff',
//       //main: '#5664d2',
//       //main: '#a556d2',
//       main: '#8a41b4',
//     },
//     text: {
//       primary: '#172b4d',
//       secondary: '#6b778c',
//     },
//   },
//   shadows,
//   typography,
// })

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',

      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      //main: '#5664d2',
      //main: '#a556d2',
      main: '#8a41b4',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    },
  },
})

export default theme
