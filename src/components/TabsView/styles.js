import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height:'100%',
    width:'100%',
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
  },
  label: {
    border: '1 solid red',
  },
  panel: {
    //border:'3px solid red',
    flex:'1 1 auto',
    overflow:'hidden',
    width:'100%',
    height:'100%',
  },
  box: {},
  header: {
    position: 'static',
    //  top: '64px',
  },
  container:{
    border:'2px solid orange',
    width:'100%',
    height: '100%',
    overflow:'auto'
  }
}))

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
