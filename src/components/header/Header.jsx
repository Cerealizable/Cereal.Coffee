import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    // justifyContent: 'center',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    marginTop: "12px",
  },
}));

function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
          onClick={() => props.history.push("/home")}
        >
          Cereal and Coffee
        </Typography>
        <Button 
          size="small" 
          onClick={() => props.history.push("/products")}
        >
          View Products
        </Button>
        <Button 
          size="small"
          onClick={() => props.history.push("/products")}
          >
          <ShoppingCartOutlinedIcon />
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

export default withRouter(Header);

Header.propTypes = {
  title: PropTypes.string
};