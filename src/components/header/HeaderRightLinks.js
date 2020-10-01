import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link 
          to="/products"
          className={classes.navLink}
        >
          View Products
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          // TODO: redirect user to shopping cart component
          to="/"
          className={classes.navLink}
        >
          <ShoppingCartOutlinedIcon />
        </Link>
      </ListItem>
    </List>
  );
}
