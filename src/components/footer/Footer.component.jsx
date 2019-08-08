import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './Footer.styles';

function Footer({ history }) {
  const classes = useStyles();

  function signUpMentor() {
    history.push('/mentor/signup');
  }

  return (
    <footer className={classes.footer}>
      <div>
        <Typography variant='body1'>MentorDating Copyright &copy;</Typography>
        <Button variant='contained' className={classes.becomeMentorBtn} onClick={signUpMentor}>
          Ansøg om at blive mentor
        </Button>
      </div>
    </footer>
  );
}

export default withRouter(Footer);
