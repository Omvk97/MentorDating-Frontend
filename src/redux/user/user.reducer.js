import UserActionTypes from './user.types';
import MentorActionTypes from '../mentor/mentor.types';

const INITIAL_STATE = {
  currentUser: null,
  isUserMentor: false,
  isUserAdmin: false,
  errorMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      let userIsMentor = action.payload.role === 'mentor' ? true : false;
      let userIsAdmin = action.payload.role === 'admin' ? true : false;
      return {
        ...state,
        currentUser: action.payload,
        isUserMentor: userIsMentor,
        isUserAdmin: userIsAdmin,
        errorMessage: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isUserMentor: false,
        isUserAdmin: false,
        errorMessage: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.UPDATE_MENTOR_INFO_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          mentorInfo: action.payload,
        },
      };
    case MentorActionTypes.SIGN_UP_MENTOR_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isUserMentor: true,
      };
    default:
      return state;
  }
};

export default userReducer;
