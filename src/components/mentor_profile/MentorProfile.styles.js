import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  media: {
    minHeight: 140,
  },
  profilePaper: {
    paddingBottom: theme.spacing(4),
  },
  mentorCard: {
    margin: theme.spacing(0, 2),
  },
  uploadButton: {
    width: '70%',
  },
  saveIcon: {
    marginRight: theme.spacing(1),
  },
  saveIconContainer: {
    margin: theme.spacing(1, 0),
  },
  imageContainer: {
    textAlign: 'center',
  },
}));
