import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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
  }
}));


const cards = [
  {
    name: "Aroma Mocha",
    price: 12.30,
    shortDescription: "Fresh floral aroma produced from our finest Kona beans sourced directly from the natural open fields of Columbia. ",
  },
  {
    name: "Manhattan Mocha",
    price: 9.35,
    shortDescription: "The world’s original coffee blend. Our interpretation combines sweet, fruity Ethiopian Yirgacheffe with the deep body and rich flavor of Java Estate coffees. ",
  },
  {
    name: "Lava Java",
    price: 9.25,
    shortDescription: "Picked by hand on a farm in the mountains high above the Shasta region, using a wet process method produces intensely flavorful beans, with an intensely floral aroma, and mellow, smooth taste.",
  },
  {
    name: "Melya",
    price: 8.50,
    shortDescription: "We started by combining select Latin American and East African beans, and then carefully roasted them to coax out their sweet, vibrant notes.",
  },
  {
    name: "Crema Americano",
    price: 6.75,
    shortDescription: "Private Reserve features an Arabica tri-blend of beans from Brazil, Colombia and El Salvador. Each bean is lovingly grown at high elevation, medium-roasted in Grants Pass, Oregon,",
  },
  {
    name: "Espresso entokoffenheart",
    price: 15.75,
    shortDescription: "It takes lush rains, intense sun, volcanic soils and a lot of aloha to create the distinctive characteristics of Kona coffee, Kona coffees are prized world wide for their rich aromas, mild, delicate taste, and thick body. ",
  }];

export default function ProductsMain() {
  const classes = useStyles();

  return (
      <React.Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/featured/?coffee"
                                title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.name}
                                </Typography>
                                <Typography>
                                    {card.shortDescription}
                                </Typography>
                                </CardContent>
                                <Typography>
                                    ${card.price}
                                </Typography>
                                <CardActions>
                                <Button size="small" color="primary">
                                    Details
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
   </React.Fragment>
  );
}
