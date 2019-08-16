import LayoutActionTypes from './layout.types';

export const openSnackbar = () => ({
  type: LayoutActionTypes.OPEN_SNACKBAR,
});
export const closeSnackbar = () => ({
  type: LayoutActionTypes.CLOSE_SNACKBAR,
});
export const setSnackbarVariant = snackbarVariant => ({
  type: LayoutActionTypes.SET_SNACKBAR_VARIANT,
  payload: snackbarVariant,
});
export const setSnackbarMessage = snackbarMessage => ({
  type: LayoutActionTypes.SET_SNACKBAR_MESSAGE,
  payload: snackbarMessage,
});
