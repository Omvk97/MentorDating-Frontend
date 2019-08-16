import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  messagesArea: {
    height: 500,
    width: '100%',
    overflow: 'auto',
    padding: theme.spacing(0.5),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
}));
