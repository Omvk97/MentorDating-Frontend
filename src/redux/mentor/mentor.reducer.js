import MentorActionTypes from "./mentor.types";

const INITIAL_STATE = {
  mentors: null,
  isFetching: false,
  errorMessage: null
};

const mentorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MentorActionTypes.FETCH_MENTORS_START:
      return {
        ...state,
        isFetching: true
      };
    case MentorActionTypes.FETCH_MENTORS_SUCCESS:
      return {
        ...state,
        mentors: action.payload,
        isFetching: false
      };
    case MentorActionTypes.FETCH_MENTORS_FAILURE:
    case MentorActionTypes.SIGN_UP_MENTOR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default mentorReducer;
