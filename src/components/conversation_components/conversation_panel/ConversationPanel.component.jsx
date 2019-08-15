import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import SendIcon from '@material-ui/icons/Send';

import useStyles from './ConversationPanel.styles';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import ConversationMessage from '../conversation_message/ConversationMessage.component';
import { sendMessageStart } from '../../../redux/conversation/conversation.actions';

function ConversationPanel({
  value,
  index,
  sendMessageStart,
  conversation,
  currentUser,
}) {
  const classes = useStyles();
  const [newMessage, setNewMessage] = React.useState('');

  const messagesContainer = useRef(null);

  function scrollToBottom() {
    const scrollHeight = messagesContainer.current.scrollHeight;
    const height = messagesContainer.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messagesContainer.current).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  }

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const conversationWithName =
    conversation.memberNames[
      Object.keys(conversation.memberNames).find(memberId => memberId !== currentUser.id)
    ];

  function sendNewMessage() {
    if (!newMessage) return;
    const message = {
      messageText: newMessage,
      senderId: currentUser.id,
      sentAt: new Date(),
    };
    sendMessageStart(message, conversation.id);
    setNewMessage('');
  }

  function onTextFieldKeyPressed(event) {
    if (event.key === 'Enter' && event.shiftKey) {
      const message = newMessage + '\n';
      setNewMessage(message);
      event.preventDefault();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      sendNewMessage();
    }
  }

  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`samtale med ${conversationWithName}`}>
      <Paper>
        <Grid container>
          <Grid item xs={12} className={classes.messagesArea} ref={messagesContainer}>
            {conversation.messages.map(message => (
              <ConversationMessage
                key={message.sentAt}
                message={message}
                currentUserId={currentUser.id}
              />
            ))}
          </Grid>
          <Grid item xs={12} style={{ width: '100%' }}>
            <TextField
              className={classes.margin}
              id='Ny besked'
              placeholder='Skriv ny besked her ...'
              fullWidth
              autoFocus
              multiline
              onKeyDown={onTextFieldKeyPressed}
              value={newMessage}
              onChange={event => setNewMessage(event.target.value)}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Tooltip title='Send besked'>
                      <IconButton
                        aria-label='send'
                        color='secondary'
                        onClick={sendNewMessage}>
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  sendMessageStart: (message, conversationId) =>
    dispatch(sendMessageStart({ message, conversationId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationPanel);
