import { all, call } from "redux-saga/effects";

import userSagas from "./user/user.sagas";
import mentorSagas from "./mentor/mentor.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(mentorSagas)]);
}
