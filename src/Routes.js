import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/signUp/SignUpPage";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        {/* catch all unmatched routes */}
        <Route>
            <Route path="/" render={() => <div>OOPS! This doesn't exist.</div>} />
        </Route>
    </Switch>
  );
}