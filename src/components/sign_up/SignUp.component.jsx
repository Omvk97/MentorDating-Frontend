import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";

import useStyles from "./SignUp.styles";
import { signUpStart } from "../../redux/user/user.actions";
import { checkIfUserExists } from "../../firebase/firestore.users";

function SignUp({ signUpStart, mentorIsSigningUp }) {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);

  const [lastNameInput, setLastNameInput] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const classes = useStyles();

  async function onSignUpSubmit(event) {
    event.preventDefault();
    if (await validateInput()) {
      const displayName = firstNameInput + " " + lastNameInput;
      signUpStart(displayName, emailInput, passwordInput);
    }
  }

  async function validateInput() {
    let inputValid = true;

    setfirstNameError(false);
    if (!firstNameInput) {
      setfirstNameError(true);
      inputValid = false;
    }
    setLastNameError(false);
    if (!lastNameInput) {
      setLastNameError(true);
      inputValid = false;
    }

    setEmailError(false);
    if (!validateEmail()) {
      setEmailError("Ugyldig email");
      inputValid = false;
    } else if (await checkIfUserExists(emailInput)) {
      setEmailError("Email allerede i brug");
      inputValid = false;
    }

    setPasswordError(false);
    if (!validatePassword()) {
      inputValid = false;
    }
    setConfirmPasswordError(false);
    if (passwordInput !== confirmPasswordInput) {
      setConfirmPasswordError("Kodeord matcher ikke");
      inputValid = false;
    }
    return inputValid;
  }

  function validateEmail() {
    const reguExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reguExp.test(String(emailInput).toLowerCase());
  }

  function validatePassword() {
    const lowerCaseLetterRegex = new RegExp("^(?=.*[a-z])");
    const upperCaseLetterRegex = new RegExp("^(?=.*[A-Z])");
    const numberRegex = new RegExp("^(?=.*[0-9])");
    const numOfChars = new RegExp("^(?=.{8,})");

    const passwordErrorMessage = (
      <React.Fragment>
        {!lowerCaseLetterRegex.test(String(passwordInput)) ? (
          <span>
            &#10008; Min. et lille bogstav <br />
          </span>
        ) : null}
        {!upperCaseLetterRegex.test(String(passwordInput)) ? (
          <span>
            &#10008; Min. et stort bogstav <br />
          </span>
        ) : null}
        {!numberRegex.test(String(passwordInput)) ? (
          <span>
            &#10008; Min. et tal <br />
          </span>
        ) : null}
        {!numOfChars.test(String(passwordInput)) ? (
          <span>
            &#10008; Min. længde på 8 <br />
          </span>
        ) : null}
      </React.Fragment>
    );

    const noErrorsInPassword = passwordErrorMessage.props.children.every(
      item => item == null
    );
    if (noErrorsInPassword) {
      setPasswordError(false);
      return true;
    } else {
      setPasswordError(passwordErrorMessage);
      return false;
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.formContainer}>
        <Avatar className={classes.formLoginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Opret konto
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSignUpSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={firstNameError}
                autoComplete="given-name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Fornavn"
                autoFocus
                onChange={event => setFirstNameInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastNameError}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Efternavn"
                name="lastName"
                autoComplete="family-name"
                onChange={event => setLastNameInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={emailError}
                error={Boolean(emailError)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={event => setEmailInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={passwordError}
                error={Boolean(passwordError)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Kodeord"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={event => setPasswordInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText={confirmPasswordError}
                error={Boolean(confirmPasswordError)}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Gentag kodeord"
                type="password"
                id="confirmPassword"
                onChange={event => setConfirmPasswordInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Jeg vil gerne modtage nyhedsbreve om nye mentorer og workshops."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Opret Konto
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Har du allerede en konto? Log ind
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            Opnå dine mål med en mentor
          </Typography>
        </Box>
      </div>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) =>
    dispatch(signUpStart({ displayName, email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
