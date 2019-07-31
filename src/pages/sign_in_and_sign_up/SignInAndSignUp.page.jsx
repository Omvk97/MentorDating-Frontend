import React from "react";
import { Route } from "react-router-dom";

import SignIn from "../../components/sign_in/SignIn.component";
import SignUp from "../../components/sign_up/SignUp.component";

function SignInAndSignUp({ match }) {
  return (
    <React.Fragment>
      <Route exact path={`${match.path}`} component={SignIn} />
      <Route path={`${match.path}/signup`} component={SignUp} />
    </React.Fragment>
  );
}

export default SignInAndSignUp;
