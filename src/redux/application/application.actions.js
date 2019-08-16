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
export const acceptApplicationStart = applicationId => ({
  type: ApplicationTypes.ACCEPT_APPLICATION_START,
  payload: applicationId,
});
export const acceptApplicationSuccess = () => ({
  type: ApplicationTypes.ACCEPT_APPLICATION_SUCCESS,
});
export const acceptApplicationFailure = error => ({
  type: ApplicationTypes.ACCEPT_APPLICATION_FAILURE,
  payload: error,
});
export const declineApplicationStart = applicationId => ({
  type: ApplicationTypes.DECLINE_APPLICATION_START,
  payload: applicationId,
});
export const declineApplicationSuccess = () => ({
  type: ApplicationTypes.DECLINE_APPLICATION_SUCCESS,
});
export const declineApplicationFailure = error => ({
  type: ApplicationTypes.DECLINE_APPLICATION_SUCCESS,
  payload: error,
});
export const sendApplicationStart = application => ({
  type: ApplicationTypes.SEND_APPLICATION_START,
  payload: application,
});
export const sendApplicationSuccess = () => ({
  type: ApplicationTypes.SEND_APPLICATION_SUCCESS,
});
export const sendApplicationFailure = error => ({
  type: ApplicationTypes.SEND_APPLICATION_FAILURE,
  payload: error,
});
