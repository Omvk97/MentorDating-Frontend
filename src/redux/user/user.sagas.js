import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  updateMentorInfoSuccess,
  updateMentorInfoFailure,
  setMentorPictureSuccess,
  setMentorPictureFailure,
} from './user.actions';
import {
  openSnackbar,
  setSnackbarMessage,
  setSnackbarVariant,
} from '../layout/layout.actions';

import { auth, googleProvider } from '../../firebase/firebase.utils.js';
import { getCurrentUser } from '../../firebase/firestore.users';
import {
  createUserProfileDocument,
  updateUserMentorInfo,
  setUserPicture,
} from '../../firebase/firestore.users';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userSnapshot = yield call(createUserProfileDocument, userAuth, additionalData);
    const user = yield userSnapshot.data();
    yield put(signInSuccess({ id: userSnapshot.id, ...user }));
    yield put(setSnackbarMessage(`Hej ${user.displayName}`));
    yield put(setSnackbarVariant('success'));
    yield put(openSnackbar());
  } catch (error) {
    yield put(setSnackbarMessage('Ukendt login'));
    yield put(setSnackbarVariant('error'));
    yield put(openSnackbar());
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

function* updateMentorInfo({ payload: { userId, updatedMentorInfo } }) {
  try {
    yield call(updateUserMentorInfo, userId, updatedMentorInfo);
    yield put(updateMentorInfoSuccess(updatedMentorInfo));
  } catch (error) {
    yield put(updateMentorInfoFailure(error));
  }
}
function* uploadMentorPicture({ payload: { userId, pictureBlob } }) {
  try {
    const downloadUrl = yield call(setUserPicture, userId, pictureBlob);
    yield put(setMentorPictureSuccess(downloadUrl));
  } catch (error) {
    yield put(setMentorPictureFailure(error));
  }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onUpdateMentorInfo() {
  yield takeLatest(UserActionTypes.UPDATE_MENTOR_INFO_START, updateMentorInfo);
}

function* onSetMentorPicture() {
  yield takeLatest(UserActionTypes.SET_MENTOR_PICTURE_START, uploadMentorPicture);
}

export default function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onUpdateMentorInfo),
    call(onSetMentorPicture),
  ]);
}
