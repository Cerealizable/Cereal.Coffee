import React from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './components/home/Home';
import Products from './components/product/Products';
import ProductDetailsPage from './components/product/ProductDetailsPage';



function App() {
  return (
    <CssBaseline >
        <Router>
          <Switch>
            {/* routes */}
            <Route path="/home" exact component={Home}/>
            <Route path="/products" exact component={Products}/>

            {/* //! insert id of product in between products and details */}
            <Route path="/products/details" exact component={ProductDetailsPage}/>
            <Route apth="/" render={() => <div>OOPS! This doesn't exist.</div>} />
          </Switch>
        </Router>
    </CssBaseline>
  );
}

export default App;
