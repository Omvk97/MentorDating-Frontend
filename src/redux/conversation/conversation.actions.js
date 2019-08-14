import ConversationActionTypes from './conversation.types';

export const fetchConversationsStart = currentUserId => ({
  type: ConversationActionTypes.FETCH_CONVERATIONS_START,
  payload: currentUserId,
});
export const fetchConversationsSuccess = conversations => ({
  type: ConversationActionTypes.FETCH_CONVERATIONS_SUCCESS,
  payload: conversations,
});
export const fetchConversationsFailure = error => ({
  type: ConversationActionTypes.FETCH_CONVERATIONS_FAILURE,
  payload: error,
});
