import React, { useState } from "react";
import Button from "../customButtons/Button";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import TextField from '@material-ui/core/TextField';

import styles from '../../assets/jss/material-kit-react/views/loginPage';
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, injectStripe } from "react-stripe-elements";

// drawer 
// shopping cart
// needs names and prices
// needs to add up all prices


// 1)

function StripeBillingForm({onSubmit, ...props}) {
  // CSS
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isCardComplete, setIsCardComplete] = useState(false);
  // eslint-disable-next-line
  const [isProcessing, setIsProccessing] = useState(false);


  function validateForm() {
    // convert quantity check to be greater than or equal to one
    return price.length > 0 && 
           quantity.length > 0 && 
           customerName.length > 0 &&
           isCardComplete;
  }

  async function handleSubmitClick(e) {
    e.prevenDefault();

    setIsProccessing(true);

    const { token, error } = await props.stripe.createToken({ name: customerName });

    setIsProccessing(false);

    onSubmit(price, quantity, { token, error});
  }


  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmitClick}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              id="standard-textarea1"
              label="Product Price"
              multiline
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="standard-textarea2"
              label="Product Quantity"
              multiline
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </GridItem>
          <GridItem>
            <TextField
              id="standard-textarea3"
              label="Name on the Card"
              multiline
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </GridItem>
          <GridItem>
            <CardElement
              className="card-field"
              label="Credit Card Info"
              style={{
                base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
              }}
              onChange={(e) => setIsCardComplete(e.complete)}
            />
          </GridItem>
        </GridContainer>
        <Button 
          color="success"
          type="submit"
          disabled={!validateForm()}
        >
          Purchase
        </Button>
      </form>
    </div>
  )
}

export default injectStripe(StripeBillingForm);