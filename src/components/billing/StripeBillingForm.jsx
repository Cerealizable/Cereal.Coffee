import React, { useState } from "react";
import Button from "../customButtons/Button";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

import styles from '../../assets/css/billingForm/billingFormStyle';
import '../../assets/css/billingForm/billingform.css'
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, injectStripe } from "react-stripe-elements";
import Paper from '@material-ui/core/Paper';

import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardFooter from "../card/CardFooter";
import CustomInput from "../customInput/CustomInput";
import Divider from "@material-ui/core/Divider";



// drawer 
// shopping cart
// needs names and prices
// needs to add up all prices


// 1)

function StripeBillingForm({onSubmit, ...props}) {
  // CSS
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  setTimeout(function() {
    setCardAnimation("");
  }, 700);


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
    console.log(" I am hitting my handleSubmitClick fx");
    e.preventDefault();

    setIsProccessing(true);

    const { token, error } = await props.stripe.createToken({ name: customerName });

    setIsProccessing(false);

    onSubmit(price, quantity, { token, error});
  }


  return (
    <Paper>
      <div className={classes.container}>
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleSubmitClick} className="BillingForm">
                  <CardBody>
                      <GridItem >
                        <CustomInput
                          labelText="Product Price"
                          id="product-price"
                          value={price}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: (e) => setPrice(e.target.value),
                            autoFocus: true,
                            type: "text",
                          }}
                        />
                      </GridItem>
                      <GridItem>
                        <CustomInput
                          labelText="Product Quantity"
                          id="product-quantity"
                          value={price}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: (e) => setQuantity(e.target.value),
                            type: "text",
                          }}
                        />
                      </GridItem>
                      <Divider />
                      <GridItem>
                        <CustomInput
                          labelText="Name"
                          id="customer-name"
                          value={customerName}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: (e) => setCustomerName(e.target.value),
                            type: "text",
                          }}
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button 
                      color="success"
                      type="submit"
                      disabled={!validateForm()}
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
      </div>
    </Paper>
  )
}

export default injectStripe(StripeBillingForm);