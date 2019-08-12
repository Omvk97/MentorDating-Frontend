import { takeLatest, put, all, call } from 'redux-saga/effects';

import MentorActionTypes from './mentor.types';
import {
  fetchMentorsSuccess,
  fetchMentorsFailure,
  fetchCategoryOptionsSuccess,
  fetchCategoryOptionsFailure,
  fetchMentorsWithCategorySuccess,
  fetchMentorsWithCategoryFailure,
} from './mentor.actions';
import { emailSignInStart } from '../user/user.actions';
import {
  fetchMentors,
  fetchAllCategoryOptions,
  fetchMentorsWtihCategory,
} from '../../firebase/firestore.mentors';
import { addMentorApplication } from '../../firebase/firestore.mentorApplications';

export function* fetchMentorsAsync() {
  try {
    const mentors = yield fetchMentors();
    yield put(fetchMentorsSuccess(mentors));
  } catch (error) {
    yield put(fetchMentorsFailure(error.message));
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

export function* fetchMentorsWithCategory({ payload: category }) {
  try {
    const mentors = yield fetchMentorsWtihCategory(category);
    yield put(fetchMentorsWithCategorySuccess(mentors));
  } catch (error) {
    yield put(fetchMentorsWithCategoryFailure(error));
  }
}

export function* onFetchMentorsStart() {
  yield takeLatest(MentorActionTypes.FETCH_MENTORS_START, fetchMentorsAsync);
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
export function* onFetchMentorsWithCategoryStart() {
  yield takeLatest(
    MentorActionTypes.FETCH_MENTORS_WITH_CATEGORY_START,
    fetchMentorsWithCategory
  );
}

export default function* mentorSagas() {
  yield all([
    call(onFetchMentorsStart),
    call(onMentorSendApplication),
    call(onFetchCategoryOptionsStart),
    call(onFetchMentorsWithCategoryStart),
  ]);
}
