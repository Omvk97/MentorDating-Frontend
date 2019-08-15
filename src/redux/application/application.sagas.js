import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ApplicationTypes from './application.types';

import {
  fetchAllApplicationsSuccess,
  fetchAllApplicationsFailure,
} from './application.actions';
import { firestore } from '../../firebase/firebase.utils';

export function* fetchAllApplications() {
  const applicationsRef = firestore.collection('mentorApplications');
  const channel = eventChannel(emit => {
    const unsubscribe = applicationsRef.onSnapshot(emit);
    return () => unsubscribe();
  });
  try {
    while (true) {
      const data = yield take(channel);
      let applications = [];
      data.forEach(function(application) {
        applications.push({ id: application.id, ...application.data() });
      });
      yield put(fetchAllApplicationsSuccess(applications));
    }
  } catch (error) {
    yield put(fetchAllApplicationsFailure(error));
  }
}

export function* onFetchAllApplicationsStart() {
  yield takeLatest(ApplicationTypes.FETCH_ALL_APPLICATIONS_START, fetchAllApplications);
}

export default function* userSagas() {
  yield all([call(onFetchAllApplicationsStart)]);
}
