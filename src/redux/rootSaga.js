import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import mentorSagas from './mentor/mentor.sagas';
import conversationSagas from './conversation/conversation.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(mentorSagas), call(conversationSagas)]);
}
