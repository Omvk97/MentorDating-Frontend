import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
  return {
    message: {
      padding: theme.spacing(1),
      borderRadius: theme.spacing(2),
      marginBottom: 4,
      wordBreak: 'break-all',
      display: 'inline-block',
      maxWidth: '60%',
    },
    receiverMessage: {
      backgroundColor: theme.palette.grey[200],
    },
    senderMessage: {
      textAlign: 'right',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  };
});
