//import Typography from '@material-ui/core/Typography'

//import Close from '@material-ui/icons/Close'
import CancelIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'

const TabLabel = ({ classes, onCloseTab, children }) => {
  return (
    <Grid
      className={classes.label}
      container
      direction='row'
      alignItems='stretch'
      justifyContent='space-between'
      wrap='nowrap'
    >
      {/* <Typography>{title}</Typography> */}
      {children}
      <Icon>
        <CancelIcon onClick={onCloseTab} />
      </Icon>
    </Grid>
  )
}
export default TabLabel
