import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import Slider from '@material-ui/core/Slider';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import useStyles from './MentorPicture.styles';

function CropPicture({ files, setImage }) {
  const cropEditor = useRef(AvatarEditor);
  const classes = useStyles();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1.2);

  function setEditorRef(editor) {
    if (editor) {
      cropEditor.current = editor;
    }
  }

  function onCropChange() {
    if (cropEditor.current) {
      cropEditor.current.getImageScaledToCanvas().toBlob(blob => {
        setImage(blob);
      }, 'image/jpeg');
    }
  }

  const sliderTheme = createMuiTheme({
    palette: {
      primary: { main: '#4caf50' },
    },
  });

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <div className={classes.cropper}>
          <AvatarEditor
            ref={setEditorRef}
            image={files[0].preview}
            border={50}
            width={300}
            height={300}
            color={[88, 88, 88, 0.6]}
            scale={zoom}
            rotate={rotation}
            onImageChange={() => onCropChange()}
            onLoadSuccess={() => onCropChange()}
          />
        </div>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={6}>
          <ThemeProvider theme={sliderTheme}>
            <Slider
              defaultValue={zoom}
              aria-labelledby='zoom slider'
              valueLabelDisplay='auto'
              step={0.2}
              marks
              min={1}
              max={5}
              onChange={(event, newValue) => setZoom(newValue)}
            />
          </ThemeProvider>
        </Grid>
      </Grid>
      <Grid item container justify='center'>
        <IconButton
          variant='contained'
          color='secondary'
          onClick={() => setRotation(rotation - 90)}>
          <RotateLeftIcon />
        </IconButton>
        <IconButton
          variant='contained'
          color='secondary'
          onClick={() => setRotation(rotation + 90)}>
          <RotateRightIcon />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}

export default CropPicture;
