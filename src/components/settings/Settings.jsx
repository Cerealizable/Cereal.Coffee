import React, { useState, useEffect } from "react";

// Routing 
import { useHistory } from "react-router-dom";

// API
import { API } from "aws-amplify" ;
import { Elements, StripeProvider } from "react-stripe-elements";

// Error checking
import {onError} from "../../libs/errorLib";

// configuration
import config from "../../config";

// CSS
import StripeBillingForm from "../billing/StripeBillingForm";
import Swal from 'sweetalert2'

export default function Settings() {
  const history = useHistory();
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
  
      Swal.fire({
        position: 'top-middle',
        showConfirmButton: false,
        title: "Purchase Successful!",
        icon: "success",
        timer: 1200,
        timerProgressBar: true
      }).then(() => {
        return history.push("/");
      });

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