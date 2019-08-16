import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import mentorReducer from './mentor/mentor.reducer';
import conversationReducer from './conversation/conversation.reducer';
import applicationReducer from './application/application.reducer';
import layoutReducer from './layout/layout.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  mentor: mentorReducer,
  conversation: conversationReducer,
  application: applicationReducer,
  layout: layoutReducer,
});

export default rootReducer;
