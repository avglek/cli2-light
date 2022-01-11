import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    color: '#ffffff',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  content: {
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',

    flex: '1 1 auto',

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  title: {
    flexGrow: 1,
    color: '#ffffff',
  },
  footer: {
    minHeight: '28px',
    background: '#fafafa',
    borderTop: '1px solid #bdbdbd',
    color: '#a0a0a0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBody: {
    flex: '1 1 auto',
    overflow: 'auto',
    height: '100%',
    width: '100%',
  },
}));
