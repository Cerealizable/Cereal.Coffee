import React from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import HeaderLinks from './components/header/HeaderLinks';
import Routes from "./Routes";


function App() {
  return (
    <CssBaseline >
        <Header
        absolute
        color="transparent"
        // brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        // {...rest}
        />
        <Routes />
    </CssBaseline>
  );
}

export default App;
