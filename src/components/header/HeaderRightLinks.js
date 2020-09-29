import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';


// core components
// TODO: custom dropdown on profile picture
// import CustomDropdown from "../customDropdown/CustomDropdown.js";
// import Button from "../customButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link 
          to="/"
          className={classes.navLink}
        >
          View Products
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          to="/products"
          className={classes.navLink}
        >
          <ShoppingCartOutlinedIcon />
        </Link>
      </ListItem>
    </List>
  );
}
