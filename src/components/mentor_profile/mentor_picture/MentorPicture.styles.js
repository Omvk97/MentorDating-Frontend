import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dropzone: {
    border: 'dashed 3px #eee',
    borderRadius: '5px',
    padding: theme.spacing(6),
    width: '70%',
    textAlign: 'center',
    cursor: 'pointer',
  },
  dropzoneActive: {
    border: 'dashed 3px green',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dialogControls: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cropper: {
    textAlign: 'center',
  },
  controlsWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


