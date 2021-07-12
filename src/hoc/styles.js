import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export const getStyles = makeStyles((theme) => ({
  auth: {
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      //width: `calc(100% - ${drawerWidth}px)`,
      width: '100%',
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}))
