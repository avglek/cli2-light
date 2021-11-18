import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import Divider from '@material-ui/core/Divider';

import {SiMicrosoftexcel} from 'react-icons/si'
import FileSaveDialog from '../Dialog/FileSaveDialog';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    paddingTop: '3px',
    paddingBottom: '3px',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function IconGridMenu({
                                       anchorEl,
                                       handleClose,
                                       handleFilterOn,
                                       handleFilterOff,
                                       value,
                                       data,
                                     }) {

  const [openDialog,setOpenDialog] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    handleClose()
  }

  const handleCloseDialog = ()=>{
    setOpenDialog(false)
  }

  const handleOpenDialog = () =>{
    setOpenDialog(true)
    handleClose()
  }

  return (
    <div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleCopy}>
          <ListItemIcon>
            <FileCopySharpIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary="Копировать"/>
        </StyledMenuItem>
        <Divider/>
        <StyledMenuItem onClick={handleFilterOn}>
          <ListItemIcon>
            <DoneSharpIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary="Фильтр по значению"/>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleFilterOff}>
          <ListItemIcon>
            <ClearSharpIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary="Сбросить фильтр"/>
        </StyledMenuItem>
        <Divider/>
          <StyledMenuItem onClick={handleOpenDialog}>
            <ListItemIcon>
              <SiMicrosoftexcel fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Экспорт Excel "/>
          </StyledMenuItem>
      </StyledMenu>
      <FileSaveDialog open={openDialog} handleClose={handleCloseDialog} data={data}/>
    </div>
  );
}
