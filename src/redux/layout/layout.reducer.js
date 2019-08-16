import LayoutActionTypes from './layout.types';

const INITIAL_STATE = {
  snackbarOpen: false,
  snackbarVariant: 'success',
  snackbarMessage: '',
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpen: true,
      };
    case LayoutActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false,
      };
    case LayoutActionTypes.SET_SNACKBAR_VARIANT:
      return {
        ...state,
        snackbarVariant: action.payload,
      };
    case LayoutActionTypes.SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        snackbarMessage: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
