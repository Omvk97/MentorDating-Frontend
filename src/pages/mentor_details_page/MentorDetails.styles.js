import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  banner: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: '#ede7f6',
  },
  specializationChip: {
    marginRight: theme.spacing(0.5),
  },
  media: {
    minHeight: 140,
  },
  profilePaper: {
    paddingBottom: theme.spacing(4),
  },
  mentorCard: {
    margin: theme.spacing(0, 2),
  },
  imageContainer: {
    textAlign: 'center',
  },
}));
