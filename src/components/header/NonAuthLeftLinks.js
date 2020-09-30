import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";


export default function NonAuthLeftLinks(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link 
          to="/login"
          className={classes.navLink}
        >
          Login
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          to="/signup"
          className={classes.navLink}
        >
          Sign up
        </Link>
      </ListItem>
    </List>
  );
}
