import React from 'react';
import ProductsMain from './ProductsMain';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Container from '@material-ui/core/Container';

export default function Products() {
    return (
        <React.Fragment>
            <Container>
                <Header title="Cereal and Coffee"/>
                {/* content */}
                <ProductsMain title="From the firehose"/>
                {/* end content */}
                <Footer />
            </Container>
        </React.Fragment>
    );
  }
  