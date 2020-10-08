import React, {useState, useEffect} from 'react';

import { Link } from "react-router-dom";

// Core components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

// import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

// AWS API
import { API } from "aws-amplify";

// CSS
import linkStyles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from '@material-ui/core/styles';
import { onError } from '../../libs/errorLib';
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  priceContent: {
    padding: '10px',
    width: '100%',
  }
}));

export default function ProductsMain() {
  const classes = useStyles();
  const linkClasses = useStyles(linkStyles);

  const [products, setProducts] = useState([]);

  function loadProducts() {
    return API.get("products", "/products/get")
  }
  
  useEffect(() => {
    async function onLoad() {
      try {
        const localProducts = await loadProducts();
        setProducts(localProducts);
        console.log('localProducts: ', localProducts);

      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  return (
      <React.Fragment>
        { products == null && 
          <Typography className={classes.priceContent}>
            No Coffee found at this time.
          </Typography>
        }
        { products != null &&
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/featured/?coffee"
                    title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                          {product.content}
                      </Typography>
                      <Typography>
                          {product.shortDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography className={classes.priceContent}>
                          ${product.price}
                      </Typography>
                      <Link to={`/products/${product.productId}`} className={linkClasses.navLink} size="small" color="primary">
                          Details
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        }
   </React.Fragment>
  );
}
