import MentorActionTypes from './mentor.types';

export const fetchMentorsStart = () => ({
  type: MentorActionTypes.FETCH_MENTORS_START,
});
export const fetchMentorsSuccess = mentors => ({
  type: MentorActionTypes.FETCH_MENTORS_SUCCESS,
  payload: mentors,
});
export const fetchMentorsFailure = error => ({
  type: MentorActionTypes.FETCH_MENTORS_FAILURE,
  payload: error,
});
export const sendMentorApplication = application => ({
  type: MentorActionTypes.SEND_MENTOR_APPLICATION,
  payload: application,
});
export const fetchCategoryOptionsStart = () => ({
  type: MentorActionTypes.FETCH_CATEGORY_OPTIONS_START,
});
export const fetchCategoryOptionsSuccess = categories => ({
  type: MentorActionTypes.FETCH_CATEGORY_OPTIONS_SUCCESS,
  payload: categories,
});
export const fetchCategoryOptionsFailure = errorMessage => ({
  type: MentorActionTypes.FETCH_CATEGORY_OPTIONS_FAILURE,
  payload: errorMessage,
});
