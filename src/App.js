import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import AuthLeftLinks from './components/header/AuthLeftLinks';
import NonAuthLeftLinks from './components/header/NonAuthLeftLinks';
import HeaderRightLinks from './components/header/HeaderRightLinks';
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import Footer from "./components/footer/Footer";
import Routes from "./Routes";
import 'fontsource-roboto';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // On App Mount intialize Authentication check, On App Update recheck Authentication
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    console.info('checking authentication');
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      console.info('user has session');
    }
    catch(e) {
      if (e === 'No current user'){
        console.info('user has no session');
      } else {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  
  async function handleLogout() {
    console.info('attempting to sign out user');
    await Auth.signOut();
  
    userHasAuthenticated(false);
  }

  return (
   !isAuthenticating &&

      <CssBaseline >
        {console.log('isAuthenticated: ', isAuthenticated)}
        {isAuthenticated
        ?
        //* Authenticated Header
        
          <Header
            absolute
            color="transparent"
            brand="Cereal and Coffee"
            leftLinks={<AuthLeftLinks logoutFunction={handleLogout} />}
            rightLinks={<HeaderRightLinks />}
          />
        
        :
        //* Non-authenticated header
        
          <Header
            absolute
            color="transparent"
            brand="Cereal and Coffee"
            leftLinks={<NonAuthLeftLinks />}
            rightLinks={<HeaderRightLinks />}
          />
        
        }
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
          <Routes />
        </AppContext.Provider>
        <Footer whiteFont />
      </CssBaseline>
  );
}

export default App;
