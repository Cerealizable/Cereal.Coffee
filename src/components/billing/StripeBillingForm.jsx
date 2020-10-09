import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";

// drawer first
// shopping cart
// needs names and prices
// needs to add up all prices
// 

function BillingForm({onSubmit, ...props}) {
  const [ productName, setProductName] = useState("");
  const [ price, setPrice] = useState(0);
  const [ storage, setStorage] = useState(0);
  const [isProcessing, setIsProccessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  // function validateForm() {
  //   return (
  //     fields.name !== "" &&
  //     storage !== "" &&
  //     isCardComplete
  //   );
  // }

  async function handleSubmitClick(e) {
    e.prevenDefault();

    setIsProccessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });

    setIsProccessing(false);

    onSubmit(storage, { token, error});
  }


  return (
    <form onSubmit={handleSubmitClick}>
      
    </form>
  )




}