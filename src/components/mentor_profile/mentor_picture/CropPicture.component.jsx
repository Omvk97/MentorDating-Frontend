import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import SaveIcon from '@material-ui/icons/Save';

function CropPicture({ files, setImage }) {
  const cropEditor = useRef(AvatarEditor);
  const [rotation, setRotation] = useState(0);

  function setEditorRef(editor) {
    if (editor) {
      cropEditor.current = editor;
    }
  }

  function onCropSave() {
    if (cropEditor.current) {
      cropEditor.current.getImageScaledToCanvas().toBlob(blob => {
        setImage(blob);
      }, 'image/jpeg');
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper>
          <AvatarEditor
            ref={setEditorRef}
            image={files[0].preview}
            border={50}
            color={[88, 88, 88, 0.6]} // RGBA
            scale={1.2}
            rotate={rotation}
          />
        </Paper>
      </Grid>
      <Paper>
        <Grid item xs={3}>
          <IconButton variant='contained' color='secondary' onClick={() => setRotation(rotation - 90)}>
            <RotateLeftIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
          <IconButton variant='contained' color='secondary' onClick={() => setRotation(rotation + 90)}>
            <RotateRightIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
          <IconButton variant='contained' color='secondary' onClick={onCropSave}>
            <SaveIcon />
          </IconButton>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CropPicture;
