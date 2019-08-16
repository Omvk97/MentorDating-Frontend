import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import {
  fetchConversationsSuccess,
  fetchConversationsFailure,
  sendMessageSuccess,
  sendMessageFailure,
  setupNewConversationFailure,
  setupNewConversationSuccess,
} from './conversation.actions';
import firebase, { firestore } from '../../firebase/firebase.utils';
import { eventChannel } from 'redux-saga';
import ConversationActionTypes from './conversation.types';

function* fetchConversationsListener({ payload: userId }) {
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

function* sendMessage({ payload: { conversationId, message, receiverId } }) {
  try {
    const conversationRef = firestore.doc(`conversations/${conversationId}`);
    conversationRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
      ['unreadMessages.' + receiverId]: firebase.firestore.FieldValue.increment(1),
    });
    yield put(sendMessageSuccess(message.sentAt));
  } catch (error) {
    console.log(error);

    yield put(sendMessageFailure(message.sentAt));
  }
}

function* setupConversation({ payload: { user, mentor } }) {
  try {
    const userId = user.id;
    const mentorId = mentor.id;

    const conversationId =
      user.id > mentor.id ? user.id + mentor.id : mentor.id + user.id;
    const collectionRef = firestore.collection('conversations').doc(conversationId);

    const snapshot = yield collectionRef.get();

    if (snapshot.exists) {
      yield put(setupNewConversationFailure('Already exists'));
    } else {
      const conversationObject = {
        memberNames: {
          [userId]: user.displayName,
          [mentorId]: mentor.displayName,
        },
        membersId: [userId, mentorId],
        messages: [],
      };
      collectionRef.set(conversationObject);
      yield put(setupNewConversationSuccess());
    }
  } catch (error) {
    yield put(setupNewConversationFailure(error));
  }
}

function* setConversationToRead({ payload: { conversationId, userId } }) {
  try {
    console.log(conversationId, userId);

    const conversationRef = yield firestore.doc(`conversations/${conversationId}`);
    yield conversationRef.update({
      [`unreadMessages.${userId}`]: 0,
    });
  } catch (error) {
    console.log(error);
  }
}

function* onFetchConversationsStart() {
  yield takeLatest(
    ConversationActionTypes.FETCH_CONVERATIONS_START,
    fetchConversationsListener
  );
}
function* onSendMessageStart() {
  yield takeLatest(ConversationActionTypes.SEND_MESSAGE_START, sendMessage);
}
function* onSetupNewConversationStart() {
  yield takeLatest(
    ConversationActionTypes.SETUP_NEW_CONVERSATION_START,
    setupConversation
  );
}
function* onSetConversationToRead() {
  yield takeLatest(
    ConversationActionTypes.SET_CONVERSATION_TO_READ,
    setConversationToRead
  );
}

export default function* mentorSagas() {
  yield all([
    call(onFetchConversationsStart),
    call(onSendMessageStart),
    call(onSetupNewConversationStart),
    call(onSetConversationToRead),
  ]);
}
