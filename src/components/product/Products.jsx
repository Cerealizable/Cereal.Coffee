import React from 'react';
import ProductsMain from './ProductsMain';
import Footer from '../footer/Footer';
import Container from '@material-ui/core/Container';

export default function Products() {
    return (
        <React.Fragment>
            <Container >
                {/* content */}
                <ProductsMain />
                {/* end content */}
                <Footer />
            </Container>
        </React.Fragment>
    );
  }
  