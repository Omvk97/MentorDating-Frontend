import React, { useEffect, useState } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from '../MentorProfile.styles';
import DropzoneInput from './DropzoneInput.component';
import CropPicture from './CropPicture.component';
import PreviewAndUpload from './PreviewAndUpload.component';

function getSteps() {
  return ['Vælg billede', 'Crop billede', 'Forevisning & Upload'];
}
const steps = getSteps();

function UploadPicture() {
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

  function handleReset() {
    setActiveStep(0);
  }

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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div className={classes.controls}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Tilbage
              </Button>
              <Button onClick={handleNext}>Næste</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPicture;
