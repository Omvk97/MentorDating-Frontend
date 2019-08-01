import React from "react";
import { Route, withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";

import useStyles from './SignInAndSignUp.styles';
import SignIn from "../../components/sign_in/SignIn.component";
import SignUp from "../../components/sign_up/SignUp.component";

function SignInAndSignUp({ match }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.formContainer}>
        <Avatar className={classes.formLoginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Route exact path={`${match.path}`} component={SignIn} />
        <Route path={`${match.path}/newaccount`} component={SignUp} />
      </div>
    </Container>
  );
}

export default withRouter(SignInAndSignUp);
