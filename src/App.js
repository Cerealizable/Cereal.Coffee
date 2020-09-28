import React from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import Routes from "./Routes";


function App() {
  return (
    <CssBaseline >
        <Header />
        <Routes />
    </CssBaseline>
  );
}

export default App;
