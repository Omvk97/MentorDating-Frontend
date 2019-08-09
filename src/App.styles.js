import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  toolbarCss: theme.mixins.toolbar,
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));
