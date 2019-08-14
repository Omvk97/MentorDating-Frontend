import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import {
  fetchConversationsSuccess,
  fetchConversationsFailure,
} from './conversation.actions';
import { firestore } from '../../firebase/firebase.utils';
import { eventChannel } from 'redux-saga';
import ConversationActionTypes from './conversation.types';

export function* fetchConversationsListener({ payload: userId }) {
  const conversationsRef = firestore
    .collection('conversations')
    .where('membersId', 'array-contains', userId);
  const channel = eventChannel(emit => {
    const unsubscribe = conversationsRef.onSnapshot(emit);
    return () => unsubscribe();
  });

  try {
    while (true) {
      const data = yield take(channel);
      let conversations = [];
      data.forEach(function(document) {
        conversations.push({ id: document.id, ...document.data() });
      });
      yield put(fetchConversationsSuccess(conversations));
    }
  } catch (error) {
    yield put(fetchConversationsFailure(error));
  }
}

export function* onFetchConversationsStart() {
  yield takeLatest(
    ConversationActionTypes.FETCH_CONVERATIONS_START,
    fetchConversationsListener
  );
}

export default function* mentorSagas() {
  yield all([call(onFetchConversationsStart)]);
}
