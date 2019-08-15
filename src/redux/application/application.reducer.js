import ApplicationTypes from './application.types';

const INITIAL_STATE = {
  applications: [],
  fetchApplicationsError: null,
};

const applicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ApplicationTypes.FETCH_ALL_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: action.payload,
      };
    case ApplicationTypes.FETCH_ALL_APPLICATIONS_FAILURE:
      return {
        ...state,
        fetchApplicationsError: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
