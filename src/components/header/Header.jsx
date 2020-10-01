import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Routing
import { Link } from "react-router-dom";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import stylesHeader from "../../assets/jss/material-kit-react/components/headerStyle.js";
import stylesLink from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";


const useStylesHeader = makeStyles(stylesHeader);
const useStylesLinks = makeStyles(stylesLink);

export default function Header(props) {
  const classesHeader = useStylesHeader();
  const classesLinks = useStylesLinks();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classesHeader[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classesHeader[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classesHeader[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classesHeader[changeColorOnScroll.color]);
    }
  };

  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;

  const appBarClasses = classNames({
    [classesHeader.appBar]: true,
    [classesHeader[color]]: color,
    [classesHeader.absolute]: absolute,
    [classesHeader.fixed]: fixed
  });

  const brandComponent =
    <List className={classesLinks.list}>
      <ListItem className={classesLinks.listItem}>
        <Link className={classesLinks.navLink} to="/">
          {brand}
        </Link>
      </ListItem>
    </List>;
  
  
  
  
  // <Button className={classes.title}><Link className={classes.navLink}>{brand}</Link></Button>;

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classesHeader.container}>
        {/* //* Brand */}
        {leftLinks !== undefined ? brandComponent : null}
        {/* //* Left Links */}
        <div className={classesHeader.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        {/* //* right Links */}
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classesHeader.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classesHeader.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
