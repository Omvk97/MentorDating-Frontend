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
  deleteIcon: {
    color: theme.palette.error.main,
  },
  textField: {
    padding: theme.spacing(2),
  },
  addSpecializationButton: {
    marginTop: theme.spacing(1),
  },
  categoryError: {
    color: theme.palette.error.main,
  },
}));
