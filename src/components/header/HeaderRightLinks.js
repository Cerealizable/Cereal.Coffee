import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
// import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

// import ShoppingCart from "../shoppingCart/ShoppingCart";

// import { useHistory } from "react-router-dom";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

// temporary cart icon that will be replaced with drawer for checkout
// import grey from '@material-ui/core/colors/grey';
// import Button from '@material-ui/core/Button';
// import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';



const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  // const history = useHistory();
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
      {/* <ListItem >
        <ShoppingCartOutlinedIcon style={{ color: grey[50] }} onClick={history.push("/settings")}/> 
      </ListItem>; */}
    </List>
  );
}
