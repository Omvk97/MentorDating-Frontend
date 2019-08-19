import { createSelector } from 'reselect';

const selectConversationState = state => state.conversation;
const selectUser = state => state.user.currentUser;

export const selectAllConversations = createSelector(
  [selectConversationState],
  conversation => conversation.conversations
);

export const selectIsFetchingConversations = createSelector(
  [selectConversationState],
  conversation => conversation.isFetchingConversations
);

export const selectErrorCreatingNewConversation = createSelector(
  [selectConversationState],
  conversation => conversation.errorCreatingNewConversation
);

export const selectNumberOfUnreadMessages = createSelector(
  [selectConversationState, selectUser],
  (conversation, user) => {
    if (user) {
      const totalNumberOfMessages = conversation.conversations.reduce(
        (total, conversation) => {
          return total + conversation.unreadMessages[user.id];
        },
        0
      );
      return totalNumberOfMessages;
    } else return 0;
  }
);
