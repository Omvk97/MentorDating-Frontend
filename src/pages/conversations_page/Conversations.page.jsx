import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';

import { fetchConversationsStart } from '../../redux/conversation/conversation.actions';
import {
  selectAllConversations,
  selectIsFetchingConversations,
} from '../../redux/conversation/conversation.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import useStyles from './Conversations.styles';
import ConversationNavigation from '../../components/conversation_components/conversation_navigation/ConversationNavigation.component';
import ConversationPanel from '../../components/conversation_components/conversation_panel/ConversationPanel.component';

function Conversations({
  currentUser,
  conversations,
  isFetchingConversations,
  fetchConversationsStart,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!currentUser) return;
    fetchConversationsStart(currentUser.id);
  }, [fetchConversationsStart, currentUser]);

  if (isFetchingConversations)
    return <CircularProgress className={classes.loader} color='secondary' />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label='samtaler'
          className={classes.tabs}>
          {conversations.map(con => {
            console.log(con);
            return <ConversationNavigation key={con.id} conversation={con} />;
          })}
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        {conversations.map(con => {
          return <ConversationPanel key={con.id + 'panel'} conversation={con} />;
        })}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  conversations: selectAllConversations,
  isFetchingConversations: selectIsFetchingConversations,
});

const mapDispatchToProps = dispatch => ({
  fetchConversationsStart: userId => dispatch(fetchConversationsStart(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations);
