import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

import useStyles, { buttonSignInTheme } from './SignIn.styles';
import FormDialog from '../form_dialog/FormDialog.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

function SignIn({ match, emailSignInStart, googleSignInStart }) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);

  async function onLogInSubmit(event) {
    event.preventDefault();
    emailSignInStart(emailInput, passwordInput);
  }

  function onForgotPassword(email) {
    console.log(email);
  }

  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <div className={classes.formContainer}>
        <Avatar className={classes.formLoginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log ind
        </Typography>
        <form className={classes.form} noValidate onSubmit={onLogInSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Adresse'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={event => setEmailInput(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Kodeord'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={event => setPasswordInput(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Husk mig'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Log ind
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => setForgotPasswordDialogOpen(true)}
                variant='body2'
                style={{ cursor: 'pointer' }}>
                Glemt kodeord?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to={`${match.path}/newaccount`}
                variant='body2'>
                Ingen konto? Opret en konto
              </Link>
            </Grid>
          </Grid>
          <ThemeProvider theme={buttonSignInTheme}>
            <Grid container className={classes.signInWithOthers}>
              <Grid item xs>
                <Button color='primary' variant='contained' onClick={googleSignInStart}>
                  Log ind med Google
                </Button>
              </Grid>
              <Grid item>
                <Button color='secondary' variant='contained'>
                  Log ind med Twitter
                </Button>
              </Grid>
            </Grid>
          </ThemeProvider>
        </form>
        <FormDialog
          open={forgotPasswordDialogOpen}
          handleClose={() => setForgotPasswordDialogOpen(false)}
          onConfirm={enteredEmail => onForgotPassword(enteredEmail)}
          dialogText={'Få tilsendt en email hvor du kan sætte et nyt kodeord'}
          dialogTitle={'Glemt Kodeord'}
          confirmButtonText={'Send'}
          inputLabel={'Email adresse'}
        />
      </div>
    </Container>
  );
}
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignIn)
);
