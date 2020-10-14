import React from "react";

//Routing
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/authentication/UnauthenticatedRoute";


// Components
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import ProductDetails from "./components/product/ProductDetails";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signUp/SignUpPage";
import CreateProduct from "./components/product/createProduct";
import Settings from "./components/settings/Settings";
import StripeBillingForm from "./components/billing/StripeBillingForm";
import UnathenticatedRoute from "./components/authentication/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
        <AuthenticatedRoute exact path="/checkout">
          <StripeBillingForm />
        </AuthenticatedRoute>
        <UnathenticatedRoute exact path={["/home", "/"]}>
          <Home />
        </UnathenticatedRoute>
        <UnauthenticatedRoute exact path="/products">
          <Products />
        </UnauthenticatedRoute>
        <Route exact path="/products/create">
          <CreateProduct />
        </Route>
        <UnathenticatedRoute exact path="/products/:id">
          <ProductDetails />
        </UnathenticatedRoute>
        <UnathenticatedRoute exact path="/login">
          <LoginPage />
        </UnathenticatedRoute>
        <UnathenticatedRoute exact path="/signup">
          <SignUpPage />
        </UnathenticatedRoute>
        <AuthenticatedRoute exact path="/settings" >
          <Settings />
        </AuthenticatedRoute>
        {/* catch all unmatched routes */}
        <Route>
            <Route path="/" render={() => <div>OOPS! This doesn't exist.</div>} />
        </Route>
    </Switch>
  );
}