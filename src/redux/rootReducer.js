import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import mentorReducer from "./mentor/mentor.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  mentor: mentorReducer
});

export default rootReducer;
