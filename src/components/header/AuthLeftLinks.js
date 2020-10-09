import React, { useState } from "react";


// react components for routing our app without refresh
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';






import styles  from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";


export default function AuthLeftLinks ({logoutFunction}) {
  // Header CSS
  const useHeaderStyles = makeStyles(styles);
  const headerClasses = useHeaderStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();


  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSettings = () => {
    setAnchorEl(null);

    history.push("/settings");
  }

  async function handleLogout() {
    await logoutFunction();

    history.push("/login")
  }

  return (
    <List className={headerClasses.list}>
      <ListItem className={headerClasses.listItem}>
        {/* // TODO: replace favorite component with actual user profile image */}
        <Button justIcon round aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar alt="name" src="https://source.unsplash.com/featured/?Avatar" />
        </Button>
        <Menu
          id="avatar-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleSettings}>Settings</MenuItem>
          <Divider light />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        
      </ListItem>
    </List>
  );
}

