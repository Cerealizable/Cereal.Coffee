import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";

export default function UnathenticatedRoute({children, ...rest}) {
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );  
}