import { createSelector } from 'reselect';

const selectUserState = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUserState],
  user => user.currentUser
);

export const selectErrorMessage = createSelector(
  [selectUserState],
  user => user.errorMessage
);

export const selectIsUserAMentor = createSelector(
  [selectUserState],
  user => user.isUserMentor
);

export const selectPictureUploadedSuccess = createSelector(
  [selectUserState],
  user => user.pictureUploadedSuccess
);

export const selectPictureUploading = createSelector(
  [selectUserState],
  user => user.pictureUploading
);
