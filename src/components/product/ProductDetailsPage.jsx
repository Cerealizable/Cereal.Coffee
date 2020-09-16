import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ProductDetails from './ProductDetails';
import Container from '@material-ui/core/Container';

export default function ProductDetailsPage() {
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Header />
                <ProductDetails />
                <Footer />
            </Container>
        </React.Fragment>
    )
};