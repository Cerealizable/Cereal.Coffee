import React from 'react';
import ProductDetails from './ProductDetails';
import Container from '@material-ui/core/Container';

export default function ProductDetailsPage() {
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <ProductDetails />
            </Container>
        </React.Fragment>
    )
};