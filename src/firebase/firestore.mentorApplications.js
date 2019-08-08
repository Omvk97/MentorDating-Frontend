import { firestore } from './firebase.utils';

export const addMentorApplication = (userId, application) => {
  firestore.doc(`mentorApplications/${userId}`).set(application);
};
