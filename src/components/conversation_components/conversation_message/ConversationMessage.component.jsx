import React from 'react';

import Typography from '@material-ui/core/Typography';

import useStyles from './ConversationMessage.styles';
import { monthToString, dateHourToString, dateMinuteToString } from './SentAtDate.utils'

function ConversationMessage({ message, currentUserId }) {
  console.log(message);
  const classes = useStyles();
  const currentUserIsSender = message.senderId === currentUserId;
  const messageAlignment = currentUserIsSender ? 'right' : 'left';

  const sentAtDate = new Date(message.sentAt.seconds * 1000);
  const sentAtDateString = `${sentAtDate.getDate()}.${monthToString(
    sentAtDate.getMonth()
  )} - ${dateHourToString(sentAtDate.getHours())}.${dateMinuteToString(sentAtDate.getMinutes())}`;

  return (
    <div style={{ textAlign: messageAlignment }}>
      <Typography
        className={`${classes.message} ${
          currentUserIsSender ? classes.senderMessage : classes.receiverMessage
        }`}>
        {message.messageText}
      </Typography>
      <Typography variant='body2'>
        {sentAtDateString}
      </Typography>
    </div>
  );
}

export default ConversationMessage;
