import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import {
  selectAllConversations,
  selectIsFetchingConversations,
} from '../../redux/conversation/conversation.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import useStyles from './Conversations.styles';
import ConversationPanel from '../../components/conversation_components/conversation_panel/ConversationPanel.component';

function Conversations({
  currentUser,
  conversations,
  isFetchingConversations,
  fetchConversationsStart,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let messagesIndex = 0;

  useEffect(() => {
    if (!currentUser) return;
  }, [fetchConversationsStart, currentUser]);

  if (isFetchingConversations)
    return <CircularProgress className={classes.loader} color='secondary' />;
  if (conversations.length === 0)
    return (
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        Du har ikke startet nogle samtaler endnu
      </Typography>
    );

  if (!currentUser) return null;

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='samtaler'
          className={classes.tabs}>
          {conversations.map(con => {
            const conversationWithName =
              con.memberNames[
                Object.keys(con.memberNames).find(memberId => memberId !== currentUser.id)
              ];
            return <Tab key={con.id} label={conversationWithName} />;
          })}
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        {conversations.map(con => {
          return (
            <ConversationPanel
              key={con.id + 'panel'}
              conversation={con}
              value={value}
              index={messagesIndex++}
            />
          );
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

export default connect(mapStateToProps)(Conversations);
