/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

// core components
// TODO: custom dropdown on profile picture
// import CustomDropdown from "../customDropdown/CustomDropdown.js";
import Button from "../customButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button 
          size="small" 
          onClick={() => props.history.push("/products")}
        >
          View Products
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button 
          size="small"
          onClick={() => props.history.push("/products")}
        >
          <ShoppingCartOutlinedIcon />
        </Button>
      </ListItem>
    </List>
  );
}
