import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import useStyles from './SignUpStepper.styles';

import MentorExperienceSurvey from '../mentor_experience_survey/MentorExperienceSurvey.component';
import PersonalInformation from '../personal_information/PersonalInformation.component';
import { sendMentorApplication } from '../../../redux/mentor/mentor.actions';
import DialogHeader from '../../closeable_dialog_header/DialogHeader.component';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

function getSteps() {
  let steps = ['Erfaring', 'Personlige oplysninger'];
  return steps;
}
const steps = getSteps();

function SignUpProcess({ sendMentorApplication, history, currentUser }) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [mentorExperience, setMentorExperience] = useState({
    previousExperience: '',
    reasons: '',
  });
  const [personalInformation, setPersonalInformation] = useState({
    address: '',
    city: '',
    zipCode: '',
    educationBackground: '',
    birthDate: null,
  });
  const [sendApplicationAlertOpen, setSendApplicationAlertOpen] = useState(false);

  const getStepContent = step => {
    switch (step) {
      case 0: // login
        return <MentorExperienceSurvey onChange={onExperienceChange} values={mentorExperience} />;
      case 1: // Personal information
        return <PersonalInformation onChange={onPersonalInformationChange} values={personalInformation} />;
      default:
        return 'Fejl';
    }
  };

  function onPersonalInformationChange(inputField, value) {
    switch (inputField) {
      case 'address':
        setPersonalInformation({ ...personalInformation, address: value });
        break;
      case 'city':
        setPersonalInformation({ ...personalInformation, city: value });
        break;
      case 'zipCode':
        setPersonalInformation({ ...personalInformation, zipCode: value });
        break;
      case 'educationBackground':
        setPersonalInformation({
          ...personalInformation,
          educationBackground: value,
        });
        break;
      case 'birthDate':
        setPersonalInformation({
          ...personalInformation,
          birthDate: value,
        });
        break;
      default:
        break;
    }
  }

  function onExperienceChange(inputField, value) {
    switch (inputField) {
      case 'previousExperience':
        setMentorExperience({ ...mentorExperience, previousExperience: value });
        break;
      case 'reasons':
        setMentorExperience({ ...mentorExperience, reasons: value });
        break;
      default:
        break;
    }
  }

  function handleNext() {
    if (activeStep === 1) {
      setSendApplicationAlertOpen(true);
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const nextButtonDisabled = {
    0: !Object.values(mentorExperience).every(Boolean),
    1: !Object.values(personalInformation).every(Boolean),
  };

  function sendApplication() {
    setSendApplicationAlertOpen(false);
    sendMentorApplication({ userId: currentUser.id, application: { ...mentorExperience, ...personalInformation } });
  }

  return (
    <Container maxWidth='md'>
      <Dialog
        open={sendApplicationAlertOpen}
        onClose={() => setSendApplicationAlertOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogHeader onClose={() => setSendApplicationAlertOpen(false)}>Send andsøgning?</DialogHeader>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Indenfor 2-4 hverdage bliver din ansøgning vurderet. Herefter vil du modtage en mail med resultatet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendApplicationAlertOpen(false)} color='primary'>
            Annuller
          </Button>
          <Button onClick={sendApplication} color='primary' autoFocus>
            Send Ansøgning
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div>
            {getStepContent(activeStep)}
            <div className={classes.controls}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                Tilbage
              </Button>
              <Button
                disabled={nextButtonDisabled[activeStep]}
                variant='contained'
                color='primary'
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Send ansøgning' : 'Næste'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  sendMentorApplication: application => dispatch(sendMentorApplication(application)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpProcess)
);
