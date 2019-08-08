import React from "react";
import { Route, withRouter, Switch} from "react-router-dom";

import SignIn from "../../components/sign_in/SignIn.component";
import SignUp from "../../components/sign_up/SignUp.component";

function SignInAndSignUp({ match }) {
  
  return (
      <Switch>
        <Route exact path={`${match.path}`} component={SignIn} />
        <Route path={`${match.path}/newaccount`} component={SignUp} />
      </Switch>
  );
}

export default withRouter(SignInAndSignUp);
