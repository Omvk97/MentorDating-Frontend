import { createSelector } from 'reselect';

const selectConversationState = state => state.conversation;

export const selectAllConversations = createSelector(
  [selectConversationState],
  conversation => conversation.conversations
);

export const selectIsFetchingConversations = createSelector(
  [selectConversationState],
  conversation => conversation.isFetchingConversations
);
