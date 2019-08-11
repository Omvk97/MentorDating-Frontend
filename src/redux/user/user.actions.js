import UserActionTypes from './user.types';

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});
export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});
export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});
export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});
export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});
export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});
export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
export const updateMentorInfoStart = updatedMentorInfoAndUserId => ({
  type: UserActionTypes.UPDATE_MENTOR_INFO_START,
  payload: updatedMentorInfoAndUserId,
});
export const updateMentorInfoSuccess = updatedMentorInfo => ({
  type: UserActionTypes.UPDATE_MENTOR_INFO_SUCCESS,
  payload: updatedMentorInfo,
});
export const updateMentorInfoFailure = error => ({
  type: UserActionTypes.UPDATE_MENTOR_INFO_FAILURE,
  payload: error,
});
export const setMentorPictureStart = userIdAndPictureBlob => ({
  type: UserActionTypes.SET_MENTOR_PICTURE_START,
  payload: userIdAndPictureBlob,
});
export const setMentorPictureSuccess = pictureUrl => ({
  type: UserActionTypes.SET_MENTOR_PICTURE_SUCCESS,
  payload: pictureUrl,
});
export const setMentorPictureFailure = error => ({
  type: UserActionTypes.SET_MENTOR_PICTURE_FAILURE,
  payload: error,
});
export const temporaryMentorInfoSave = mentorInfoClone => ({
  type: UserActionTypes.TEMPORARY_MENTOR_INFO_SAVE,
  payload: mentorInfoClone,
});
