import React from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import HeaderLeftLinks from './components/header/HeaderLeftLinks';
import HeaderRightLinks from './components/header/HeaderRightLinks';
import Footer from "./components/footer/Footer";
import Routes from "./Routes";


function App() {
  return (
    <CssBaseline >
        <Header
          absolute
          color="transparent"
          brand="Cereal and Coffee"
          leftLinks={<HeaderLeftLinks />}
          rightLinks={<HeaderRightLinks />}
          // {...rest} ?????
        />
        <Routes />
        <Footer whiteFont />
    </CssBaseline>
  );
}

export default App;
