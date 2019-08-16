import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import MentorActionTypes from './mentor.types';
import {
  fetchMentorsSuccess,
  fetchMentorsFailure,
  fetchCategoryOptionsSuccess,
  fetchCategoryOptionsFailure,
} from './mentor.actions';
import { fetchAllCategoryOptions } from '../../firebase/firestore.mentors';
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
export function* onFetchCategoryOptionsStart() {
  yield takeLatest(MentorActionTypes.FETCH_CATEGORY_OPTIONS_START, fetchCategoryOptions);
}

export default function* mentorSagas() {
  yield all([
    call(onFetchMentorsStart),
    call(onFetchCategoryOptionsStart),
  ]);
}
