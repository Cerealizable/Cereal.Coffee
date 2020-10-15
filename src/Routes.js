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

export default function Routes() {
  return (
    <Switch>
        <AuthenticatedRoute exact path="/checkout">
          <StripeBillingForm />
        </AuthenticatedRoute>
        <Route exact path={["/home", "/"]}>
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <AuthenticatedRoute exact path="/products/create">
          <CreateProduct />
        </AuthenticatedRoute>
        <Route exact path="/products/:id">
          <ProductDetails />
        </Route>
        <UnauthenticatedRoute exact path="/login">
          <LoginPage />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signup">
          <SignUpPage />
        </UnauthenticatedRoute>
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