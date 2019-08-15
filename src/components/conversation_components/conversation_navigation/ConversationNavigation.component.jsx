import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tab from '@material-ui/core/Tab';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

function ConversationNavigation({ conversation, currentUser }) {

  if (!currentUser) return null;

  const conversationWithName =
    conversation.memberNames[
      Object.keys(conversation.memberNames).find(
        memberId => memberId !== currentUser.id
      )
    ];
  return <Tab label={conversationWithName} wrapped={true} />;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ConversationNavigation);
