import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tab from '@material-ui/core/Tab';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

function ConversationNavigation({ conversation, currentUser }) {
  const conversationWithId = conversation.membersId.find(
    memberId => memberId === currentUser.id
  );
  const conversationWithName = conversation.memberNames[conversationWithId];
  return <Tab label={conversationWithName} wrapped={true} />;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ConversationNavigation);
