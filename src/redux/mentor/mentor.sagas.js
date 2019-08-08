import { takeLatest, put, all, call } from "redux-saga/effects";

import MentorActionTypes from "./mentor.types";
import {
  fetchMentorsSuccess,
  fetchMentorsFailure,
  signUpMentorFailure,
  signUpMentorSuccess
} from "./mentor.actions";
import { emailSignInStart } from "../user/user.actions";
import {
  fetchMentors,
  createMentorProfile
} from "../../firebase/firestore.mentors";

export function* fetchMentorsAsync() {
  try {
    const mentors = yield fetchMentors();
    yield put(fetchMentorsSuccess(mentors));
  } catch (error) {
    yield put(fetchMentorsFailure(error.message));
  }
}

export function* onFetchMentorsStart() {
  yield takeLatest(MentorActionTypes.FETCH_MENTORS_START, fetchMentorsAsync);
}

export function* signUpMentor({payload: user}) {
  try {
    user = yield call(createMentorProfile, user)    
    yield put(signUpMentorSuccess(user));
  } catch (error) {
    yield put(signUpMentorFailure(error.message));
  }
}

export function* signInMentor(emailAndPassword) {
  yield put(emailSignInStart(emailAndPassword))
}

export function* onSignUpMentorStart() {
  yield takeLatest(MentorActionTypes.SIGN_UP_MENTOR_START, signUpMentor);
}
export function* onSignUpMentorSuccess() {
  yield takeLatest(MentorActionTypes.SIGN_UP_MENTOR_SUCCESS, signInMentor)
}

export default function* mentorSagas() {
  yield all([call(onFetchMentorsStart), call(onSignUpMentorStart)]);
}
