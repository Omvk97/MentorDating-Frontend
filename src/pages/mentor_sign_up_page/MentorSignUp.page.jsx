import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import SignUpStepper from "../../components/become_mentor/sign_up_stepper/SignUpStepper.component";
import { selectCurrentUser } from "../..//redux/user/user.selectors";

function MentorSignUp({ currentUser, history }) {
  if (currentUser == null) history.push("/login"); // user not logged in

  return (
    <React.Fragment>
      <SignUpStepper />
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(MentorSignUp);
