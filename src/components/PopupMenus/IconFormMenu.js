import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import { MdContentPaste } from "react-icons/md";


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
    paddingTop:'3px',
    paddingBottom:'3px',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function IconFormMenu({anchorEl,handleClose,handleSetText}) {

  // const handlePaste = async() =>{
  //   const value = await window.navigator.clipboard.readText()
  //   console.log('get from clipboard:',value)
  //   handleSetText(value)
  //   handleClose()
  // }

  const handlePaste = () =>{
    handleClose()
    const value = document.execCommand('paste')
    handleSetText(value)
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

        <StyledMenuItem onClick={handlePaste} >
          <ListItemIcon>
            <MdContentPaste fontSize="large"/>
          </ListItemIcon>
          <ListItemText primary="Вставить" />
        </StyledMenuItem>
        <Divider />
      </StyledMenu>
    </div>
  );
}
