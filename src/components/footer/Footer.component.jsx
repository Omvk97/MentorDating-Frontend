import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './Footer.styles';
import { selectCurrentUser } from '../../redux/user/user.selectors';

function Footer({ history, currentUser }) {
  const classes = useStyles();

  function signUpMentor() {
    history.push('/ansøg/mentor');
  }

  if (!currentUser) return null;

  return (
    <footer className={classes.footer}>
      <div>
        <Typography variant='body1'>MentorDating Copyright &copy;</Typography>
        {currentUser.role === 'user' ? (
          <Button
            variant='contained'
            className={classes.becomeMentorBtn}
            onClick={signUpMentor}>
            Ansøg om at blive mentor
          </Button>
        ) : null}
      </div>
    </footer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(Footer));
