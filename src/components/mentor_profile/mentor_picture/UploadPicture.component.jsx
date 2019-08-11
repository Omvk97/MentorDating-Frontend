import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './MentorPicture.styles';
import DropzoneInput from './DropzoneInput.component';
import CropPicture from './CropPicture.component';
import PreviewAndUpload from './PreviewAndUpload.component';
import { setMentorPictureStart } from '../../../redux/user/user.actions';
import {
  selectPictureUploadedSuccess,
  selectPictureUploading,
  selectCurrentUser,
} from '../../../redux/user/user.selectors';

function getSteps() {
  return ['Vælg billede', 'Crop billede', 'Forevisning & Upload'];
}
const steps = getSteps();

function UploadPicture({
  pictureUploadSuccess,
  pictureUploading,
  setMentorPictureStart,
  currentUser,
  onUpload,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (files.length > 0) handleNext(); // file has been uploaded, next step

    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  if (pictureUploadSuccess) onUpload();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <DropzoneInput setFiles={setFiles} />;
      case 1:
        return <CropPicture files={files} setImage={setImage} />;
      case 2:
        return <PreviewAndUpload pictureBlob={image} />;
      default:
        return 'Ups';
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function onPictureUpload() {
    setMentorPictureStart(currentUser.id, image);
  }

  const buttonClassname = clsx({
    [classes.buttonSuccess]: pictureUploadSuccess,
  });

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>{getStepContent(activeStep)}</div>
        <div className={classes.dialogControls}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Tilbage
          </Button>
          {activeStep === 2 ? (
            <div className={classes.controlsWrapper}>
              <Button
                variant='contained'
                color='secondary'
                className={buttonClassname}
                disabled={pictureUploading}
                onClick={onPictureUpload}>
                Upload billede
              </Button>
              {pictureUploading && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
            </div>
          ) : (
            <div>
              {files.length ? (
                <Button disabled={!image} onClick={handleNext}>
                  Næste
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  pictureUploading: selectPictureUploading,
  pictureUploadSuccess: selectPictureUploadedSuccess,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setMentorPictureStart: (userId, pictureBlob) =>
    dispatch(setMentorPictureStart({ userId, pictureBlob })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPicture);
