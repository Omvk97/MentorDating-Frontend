import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
  specializationChip: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
}));
