import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from '@material-ui/core/Box';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

function ConversationPanel({ value, index, children, conversation, currentUser }) {
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
      {conversation.messages.map(message => (
        <div key={message.sentAt}>{message.messageText}</div>
      ))}
    </Box>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ConversationPanel);
