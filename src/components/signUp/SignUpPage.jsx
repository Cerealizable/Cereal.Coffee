import React, { useState } from "react";
import { useHistory } from "react-router-dom";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import Button from "../customButtons/Button";
import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardHeader from "../card/CardHeader";
import CardFooter from "../card/CardFooter";
import CustomInput from "../customInput/CustomInput";

// CSS
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

// Attachments
import image from "../../assets/img/bgLogin.jpg";

// AWS Authentication
import { Auth } from "aws-amplify";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";



export default function SignUpPage(props) {
  // CSS
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // functionality
  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState(null);
  const history = useHistory();


  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
      });
      // setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      // setIsLoading(false);
    }
  };

  async function handleConfirmationSubmit(e) {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
  
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      // setIsLoading(false);
    }
  }
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);


  function renderConfirmationForm() {
    return (
      <div>
        <form className={classes.form} onSubmit={handleConfirmationSubmit}>
          <CardBody>
            <CustomInput
              labelText="Confirmation Code"
              id="confirmationCode"
              value={confirmationCode}
              // key={"key_" + (this.props.id || this.id)}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (e) => setConfirmationCode(e.target.value),
                autoFocus: true,
                type: "tel",
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={classes.inputIconsColor}>
                      lock_outline
                    </Icon>
                  </InputAdornment>
                )
              }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button 
              simple color="primary" 
              size="lg"
              type="submit"
              disabled={!validateConfirmationForm()}
              >
              Verify
            </Button>
          </CardFooter>
        </form>
      </div>
    )
  }



  function renderForm() {
    return (
      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <CardBody>
          
            {/* input field that takes in prop for email and updates state onChange */}
            <CustomInput
              labelText="Email..."
              id="email"
              value={email}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (e) => setEmail(e.target.value),
                autoFocus: true,
                type: "email",
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
            {/* input field that takes in prop for password and updates state onChange */}
            <CustomInput
              labelText="Password"
              id="pass"
              value={password}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (e) => setPassword(e.target.value),
                type: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={classes.inputIconsColor}>
                      lock_outline
                    </Icon>
                  </InputAdornment>
                ),
                autoComplete: "off"
              }}
            />
            <CustomInput
              labelText="Confirm Password"
              id="confirmpass"
              value={confirmPassword}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (e) => setConfirmPassword(e.target.value),
                type: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={classes.inputIconsColor}>
                      lock_outline
                    </Icon>
                  </InputAdornment>
                ),
                autoComplete: "off"
              }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button 
              simple color="primary" 
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
              Sign up
            </Button>
          </CardFooter>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h3>Sign up</h3>
                </CardHeader>
                {newUser === null ? renderForm() : renderConfirmationForm()}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
