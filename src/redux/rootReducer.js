import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import mentorReducer from './mentor/mentor.reducer';
import conversationReducer from './conversation/conversation.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  mentor: mentorReducer,
  conversation: conversationReducer,
});

export default rootReducer;
