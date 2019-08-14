import ConversationActionTypes from './conversation.types';

const INITIAL_STATE = {
  conversations: [],
  isFetchingConversations: false,
  errorFetching: null,
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
    default:
      return state;
  }
};
export default conversationReducer;
