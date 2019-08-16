import { takeLatest, put, all, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ApplicationTypes from './application.types';

import {
  fetchAllApplicationsSuccess,
  fetchAllApplicationsFailure,
  acceptApplicationSuccess,
  acceptApplicationFailure,
  declineApplicationSuccess,
  declineApplicationFailure,
  sendApplicationSuccess,
  sendApplicationFailure,
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

export function* acceptApplication({ payload: { applicationId } }) {
  try {
    const userRef = firestore.doc(`users/${applicationId}`);
    userRef.update({
      role: 'mentor',
      mentorInfo: {
        categories: [],
        contactEmail: '',
        contactPhone: '',
        description: '',
        mentorSince: new Date(),
        pictureUrl:
          'https://firebasestorage.googleapis.com/v0/b/mentordating-c1834.appspot.com/o/placeholderImage.png?alt=media&token=5c3470be-47b6-4998-8bb4-3177d08f184f',
        specializations: {},
        teachingInformation: '',
      },
    });
    const applicationRef = firestore.doc(`mentorApplications/${applicationId}`);
    applicationRef.delete();
    yield put(acceptApplicationSuccess());
  } catch (error) {
    console.log(error);
    yield put(acceptApplicationFailure(error));
  }
}

export function* declineApplication({ payload: { applicationId } }) {
  try {
    const applicationRef = firestore.doc(`mentorApplications/${applicationId}`);
    applicationRef.delete();
    yield put(declineApplicationSuccess());
  } catch (error) {
    console.log(error);
    yield put(declineApplicationFailure(error));
  }
}

export function* sendApplication({ payload: { userId, application } }) {
  try {
    const applicationRef = firestore.doc(`mentorApplications/${userId}`);
    applicationRef.set({
      ...application,
    });
    yield put(sendApplicationSuccess());
  } catch (error) {
    console.log(error);
    yield put(sendApplicationFailure());
  }
}

export function* onFetchAllApplicationsStart() {
  yield takeLatest(ApplicationTypes.FETCH_ALL_APPLICATIONS_START, fetchAllApplications);
}
export function* onAcceptApplication() {
  yield takeLatest(ApplicationTypes.ACCEPT_APPLICATION_START, acceptApplication);
}
export function* onDeclineApplication() {
  yield takeLatest(ApplicationTypes.DECLINE_APPLICATION_START, declineApplication);
}
export function* onSendApplicationStart() {
  yield takeLatest(ApplicationTypes.SEND_APPLICATION_START, sendApplication);
}

export default function* userSagas() {
  yield all([
    call(onFetchAllApplicationsStart),
    call(onAcceptApplication),
    call(onDeclineApplication),
    call(onSendApplicationStart),
  ]);
}
