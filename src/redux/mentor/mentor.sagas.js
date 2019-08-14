import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import MentorActionTypes from './mentor.types';
import {
  fetchMentorsSuccess,
  fetchMentorsFailure,
  fetchCategoryOptionsSuccess,
  fetchCategoryOptionsFailure,
} from './mentor.actions';
import { emailSignInStart } from '../user/user.actions';
import { fetchAllCategoryOptions } from '../../firebase/firestore.mentors';
import { addMentorApplication } from '../../firebase/firestore.mentorApplications';
import { firestore } from '../../firebase/firebase.utils';
import { eventChannel } from 'redux-saga';

export function* fetchMentorsListener() {
  const mentorsRef = firestore.collection('users').where('role', '==', 'mentor');
  const channel = eventChannel(emit => {
    const unsubscribe = mentorsRef.onSnapshot(emit);
    return () => unsubscribe();
  });
  try {
    while (true) {
      const data = yield take(channel);
      let mentors = [];
      data.forEach(function(document) {
        mentors.push({ id: document.id, ...document.data() });
      });
      yield put(fetchMentorsSuccess(mentors));
    }
  } catch (error) {
    yield put(fetchMentorsFailure(error));
  }
}

export function* sendApplication({ payload: { userId, application } }) {
  try {
    yield addMentorApplication(userId, application);
  } catch (error) {
    console.log(error);
  }
}

export function* signInMentor(emailAndPassword) {
  yield put(emailSignInStart(emailAndPassword));
}

export function* fetchCategoryOptions() {
  try {
    const categories = yield fetchAllCategoryOptions();
    yield put(fetchCategoryOptionsSuccess(categories));
  } catch (error) {
    yield put(fetchCategoryOptionsFailure(error));
  }
}

export function* onFetchMentorsStart() {
  yield takeLatest(MentorActionTypes.FETCH_MENTORS_START, fetchMentorsListener);
}
export function* onSignUpMentorSuccess() {
  yield takeLatest(MentorActionTypes.SIGN_UP_MENTOR_SUCCESS, signInMentor);
}
export function* onMentorSendApplication() {
  yield takeLatest(MentorActionTypes.SEND_MENTOR_APPLICATION, sendApplication);
}
export function* onFetchCategoryOptionsStart() {
  yield takeLatest(MentorActionTypes.FETCH_CATEGORY_OPTIONS_START, fetchCategoryOptions);
}

export default function* mentorSagas() {
  yield all([
    call(onFetchMentorsStart),
    call(onMentorSendApplication),
    call(onFetchCategoryOptionsStart),
  ]);
}
