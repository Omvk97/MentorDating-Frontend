import MentorActionTypes from './mentor.types';

const INITIAL_STATE = {
  mentors: null,
  isFetching: false, // SHould maybe make another isFetching for categoryOptions (isFetchingMentors & isFetchingCategoryOptions)
  errorMessage: null,
  categoryOptions: [],
  mentorsWithCategory: [],
  isFetchingMentorsWithCategory: false,
};

const mentorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MentorActionTypes.FETCH_MENTORS_START:
    case MentorActionTypes.FETCH_CATEGORY_OPTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case MentorActionTypes.FETCH_MENTORS_SUCCESS:
      return {
        ...state,
        mentors: action.payload,
        isFetching: false,
      };
    case MentorActionTypes.FETCH_MENTORS_FAILURE:
    case MentorActionTypes.FETCH_CATEGORY_OPTIONS_FAILURE:
    case MentorActionTypes.FETCH_MENTORS_WITH_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case MentorActionTypes.FETCH_CATEGORY_OPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categoryOptions: action.payload,
      };
    case MentorActionTypes.FETCH_MENTORS_WITH_CATEGORY_START:
      return {
        ...state,
        isFetchingMentorsWithCategory: true,
      };
    case MentorActionTypes.FETCH_MENTORS_WITH_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetchingMentorsWithCategory: false,
        mentorsWithCategory: action.payload,
      };
    default:
      return state;
  }
};

export default mentorReducer;
