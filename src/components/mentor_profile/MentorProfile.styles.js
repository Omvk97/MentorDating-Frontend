import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  banner: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: '#ede7f6',
  },
  profilePaper: {
    paddingBottom: theme.spacing(4),
  },
  input: {
    display: 'none',
  },
  mentorCard: {
    margin: theme.spacing(0, 2),
  },
  uploadButton: {
    cursor: 'pointer',
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  dropzone: {
    border: 'dashed 3px #eee',
    borderRadius: '5px',
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  dropzoneActive: {
    border: 'dashed 3px green',
  },
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  controls: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
