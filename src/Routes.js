import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import ProductDetails from "./components/product/ProductDetails";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signUp/SignUpPage";
import CreateProduct from "./components/product/createProduct";
import Settings from "./components/settings/Settings";

export default function Routes() {
  return (
    <Switch>
        <Route exact path={["/home", "/"]}>
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/create">
          <CreateProduct />
        </Route>
        <Route exact path="/products/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/settings" >
          <Settings />
        </Route>
        {/* catch all unmatched routes */}
        <Route>
            <Route path="/" render={() => <div>OOPS! This doesn't exist.</div>} />
        </Route>
    </Switch>
  );
}