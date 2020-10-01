import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// AWS Authentication
// import { Auth } from "aws-amplify";


import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";


export default function AuthLeftLinks ({logoutFunction}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  async function testfunction() {
    console.info('testing my function', logoutFunction);
    await logoutFunction();
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {/* // TODO: Profile picture for user account with dropdown menu */}
          <Link
            to="/login"
            className={classes.navLink}
          >
            <div onClick={testfunction}>
              Logout
            </div>
          </Link>
      </ListItem>
    </List>
  );
}

