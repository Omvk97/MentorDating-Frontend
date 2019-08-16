import { createSelector } from 'reselect';

const selectLayoutState = state => state.layout;

export const selectSnackbarOpen = createSelector(
  [selectLayoutState],
  layout => layout.snackbarOpen
);
export const selectSnackbarVariant = createSelector(
  [selectLayoutState],
  layout => layout.snackbarVariant
);
export const selectSnackbarMessage = createSelector(
  [selectLayoutState],
  layout => layout.snackbarMessage
);
