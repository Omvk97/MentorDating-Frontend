import ApplicationTypes from './application.types';

export const fetchAllApplicationsStart = () => ({
  type: ApplicationTypes.FETCH_ALL_APPLICATIONS_START,
});
export const fetchAllApplicationsSuccess = applications => ({
  type: ApplicationTypes.FETCH_ALL_APPLICATIONS_SUCCESS,
  payload: applications,
});
export const fetchAllApplicationsFailure = error => ({
  type: ApplicationTypes.FETCH_ALL_APPLICATIONS_FAILURE,
  payload: error,
});
