import React from 'react';
import Container from '@material-ui/core/Container';
import ProductsMain from './ProductsMain';
import { useHistory } from "react-router-dom";
import Button from "../customButtons/Button";



export default function Products() {
    const history = useHistory();

    const createButton = () => {
        history.push("/products/create");
    }

    return (
        <React.Fragment>
            <Container >
                {/* content */}
                <ProductsMain />
                <Button styles="padding-top: 100" color="success" round onClick={createButton}>
                    New Product
                </Button>
            </Container>
        </React.Fragment>
    );
  }
  