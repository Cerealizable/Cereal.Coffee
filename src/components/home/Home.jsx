
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import MainFeaturedPost from '../featured/FeaturedMainPost';
import FeaturedPost from '../featured/FeaturedProduct';
import ProductsMain from '../product/ProductsMain';
import Sidebar from '../sidebar/Sidebar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const mainFeaturedPost = {
  title: 'Entkoffeiniert Espresso',
  description:
    "A combination of select Latin American and East African beans, and then carefully roasted them to coax out their sweet, vibrant notes. The result is delightfully well-rounded and wonderfully versatile—delicious hot or served over ice.",
  image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Espresso entkoffeiniert',
    date: 'Nov 12',
    description:
      'A combination of select Latin American and East African beans, and then carefully roasted them to coax out their sweet, vibrant notes. The result is delightfully well-rounded and wonderfully served over ice.',
    image: 'https://images.unsplash.com/photo-1573883844855-f364441ac463?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    imageText: 'Image Text',
  },
  {
    title: 'sombre le café',
    date: 'Nov 11',
    description:
      'Deep, untamed flavors ripple in this cup—earthy, herbal and complex with a lingering spice. Full-bodied with a smooth mouthfeel, lingering flavors of dried herbs and fresh earth, and almost no acidity. ',
    image: 'https://images.unsplash.com/photo-1551610290-e153ec567dd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=913&q=80',
    imageText: 'Image Text',
  }
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

export default function LandingPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                  Quick view
              </Typography>
              <Divider />
              <ProductsMain />
            </Grid>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}