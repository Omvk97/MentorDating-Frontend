import { takeLatest, put, all, call } from 'redux-saga/effects';

import MentorActionTypes from './mentor.types';
import {
  fetchMentorsSuccess,
  fetchMentorsFailure,
  signUpMentorFailure,
  signUpMentorSuccess,
  fetchCategoryOptionsSuccess,
  fetchCategoryOptionsFailure,
} from './mentor.actions';
import { emailSignInStart } from '../user/user.actions';
import {
  fetchMentors,
  createMentorProfile,
  fetchAllCategoryOptions,
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


export function* signUpMentor({ payload: user }) {
  try {
    user = yield call(createMentorProfile, user);
    yield put(signUpMentorSuccess(user));
  } catch (error) {  
    yield put(signUpMentorFailure(error.message));
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
  yield takeLatest(MentorActionTypes.FETCH_MENTORS_START, fetchMentorsAsync);
}
export function* onSignUpMentorStart() {
  yield takeLatest(MentorActionTypes.SIGN_UP_MENTOR_START, signUpMentor);
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
    call(onSignUpMentorStart),
    call(onMentorSendApplication),
    call(onFetchCategoryOptionsStart),
  ]);
}
