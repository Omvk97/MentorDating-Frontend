import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import CloudUpload from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './MentorPicture.styles';
import Typography from '@material-ui/core/Typography';

function UploadPicture({ setFiles }) {
  const classes = useStyles();
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        {...getRootProps()}
        className={`${classes.dropzone} ${isDragActive ? classes.dropzoneActive : null}`}>
        <input {...getInputProps()} />
        <IconButton
          aria-label='upload profile picture'
          color='secondary'
          component='span'>
          <CloudUpload className={classes.uploadButton} />
        </IconButton>
        <Typography variant='h6' component='h6'>
          Vælg eller træk dit billede
        </Typography>
      </div>
    </div>
  );
}

export default UploadPicture;
