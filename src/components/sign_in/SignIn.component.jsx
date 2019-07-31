import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import styles from "./SignIn.styles";

function SignIn() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  function onLogInSubmit(event) {
    event.preventDefault();
    console.log("EmailInput: ", emailInput);
    console.log("PasswordInput: ", passwordInput);
  }

  const classes = styles();
  return (
    <Container maxWidth="xs">
      <div className={classes.formContainer}>
        <Avatar className={classes.formLoginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log ind
        </Typography>
        <form className={classes.form} noValidate onSubmit={onLogInSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Adresse"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => setEmailInput(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Kodeord"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPasswordInput(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Husk mig"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log ind
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Glemt kodeord?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Ingen konto? Opret konto
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          Opnå dine mål med en mentor
        </Typography>
      </Box>
    </Container>
  );
}

export default SignIn;
