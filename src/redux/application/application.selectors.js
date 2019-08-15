import { createSelector } from 'reselect';

const selectApplicationState = state => state.application;

export const selectApplications = createSelector(
  [selectApplicationState],
  application => application.applications
);

export const selectErrorMessage = createSelector(
  [selectApplicationState],
  application => application.fetchApplicationsError
);
