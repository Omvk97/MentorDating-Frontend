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
export const sendMessageStart = messageAndConversationId => ({
  type: ConversationActionTypes.SEND_MESSAGE_START,
  payload: messageAndConversationId,
});
export const sendMessageSuccess = messageTimestamp => ({
  type: ConversationActionTypes.SEND_MESSAGE_SUCCESS,
  payload: messageTimestamp,
});
export const sendMessageFailure = messageTimestamp => ({
  type: ConversationActionTypes.SEND_MESSAGE_FAILURE,
  payload: messageTimestamp,
});
export const setupNewConversationStart = userIdAndMentorId => ({
  type: ConversationActionTypes.SETUP_NEW_CONVERSATION_START,
  payload: userIdAndMentorId,
});
export const setupNewConversationSuccess = () => ({
  type: ConversationActionTypes.SETUP_NEW_CONVERSATION_SUCCESS,
});
export const setupNewConversationFailure = error => ({
  type: ConversationActionTypes.SETUP_NEW_CONVERSATION_FAILURE,
  payload: error,
});
