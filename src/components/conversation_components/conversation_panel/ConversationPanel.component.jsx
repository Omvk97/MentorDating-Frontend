import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import SendIcon from '@material-ui/icons/Send';

import useStyles from './ConversationPanel.styles';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import ConversationMessage from '../conversation_message/ConversationMessage.component';

function ConversationPanel({ value, index, children, conversation, currentUser }) {
  const classes = useStyles();
  const conversationWithId = conversation.membersId.find(
    memberId => memberId === currentUser.id
  );
  const conversationWithName = conversation.memberNames[conversationWithId];
  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`samtale med ${conversationWithName}`}>
      <Grid container>
        <Grid item xs={12} className={classes.messagesArea}>
          {conversation.messages.map(message => (
            <ConversationMessage key={message.sentAt} message={message} currentUserId={currentUser.id}/>
          ))}
        </Grid>
        <Grid item xs={12} style={{ minHeight: 100, width: '100%' }}>
          <TextField
            className={classes.margin}
            id='Ny besked'
            placeholder='Skriv ny besked her ...'
            fullWidth
            multiline
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Send besked'>
                    <IconButton aria-label='send' color='secondary'>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ConversationPanel);
