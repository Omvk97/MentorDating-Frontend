import ConversationActionTypes from './conversation.types';

const INITIAL_STATE = {
  conversations: [],
  isFetchingConversations: false,
  errorFetching: null,
  messagesSending: [],
  messagesErrorSending: [],
  errorCreatingNewConversation: null,
};

const conversationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConversationActionTypes.FETCH_CONVERATIONS_START:
      return {
        ...state,
        isFetchingConversations: true,
      };
    case ConversationActionTypes.FETCH_CONVERATIONS_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
        isFetchingConversations: false,
      };
    case ConversationActionTypes.FETCH_CONVERATIONS_FAILURE:
      return {
        ...state,
        errorFetching: action.payload,
      };
    case ConversationActionTypes.SEND_MESSAGE_START:
      return {
        ...state,
        messagesSending: [
          ...state.messagesSending,
          action.payload.message.sentAt.getTime(),
        ],
      };
    case ConversationActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messagesSending: state.messagesSending.filter(
          messageTimestamp => messageTimestamp !== action.payload
        ),
      };
    case ConversationActionTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        messagesErrorSending: state.messagesErrorSending.push(action.payload),
      };
    case ConversationActionTypes.SETUP_NEW_CONVERSATION_START:
      return {
        ...state,
        errorCreatingNewConversation: null,
      };
    case ConversationActionTypes.SETUP_NEW_CONVERSATION_FAILURE:
      return {
        ...state,
        errorCreatingNewConversation: action.payload,
      };
    default:
      return state;
  }
};
export default conversationReducer;
