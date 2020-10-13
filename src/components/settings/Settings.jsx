import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { API } from "aws-amplify" ;
import {onError} from "../../libs/errorLib";
import config from "../../config";
import { Elements, StripeProvider } from "react-stripe-elements";
import StripeBillingForm from "../billing/StripeBillingForm";


export default function Settings() {
  // const history = useHistory();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY))
  }, []);


  async function handleFormSubmit(price, quantity, { token, error }) {
    if (error) {
      onError(error);
      return;
    }
    
    try {
      await billUser({
        price,
        quantity,
        source: token.id
      });
  
      alert("Your card has been charged successfully!");
      // history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  function billUser(details) {
    return API.post("products", "/billing", {
      body: details
    });
  }

  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements>
          <StripeBillingForm onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  )

}