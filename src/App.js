import React from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Products from './components/products/Products';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <CssBaseline >
        <Router>
          <Switch>
            {/* routes goes here */}
            <Route path="/home" exact component={Home}/>
            <Route path="/products" exact component={Products}/>
            <Route apth="/" render={() => <div>OOPS! This doesn't exist.</div>} />
          </Switch>
        </Router>
    </CssBaseline>
  );
}

export default App;
