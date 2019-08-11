import { firestore, auth, firebaseStorageRef } from './firebase.utils';

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const { displayName } = additionalData;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        displayName,
        createdAt,
        role: 'user', // all users start as a normal user
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return snapShot;
};

export const checkIfUserExists = async email => {
  // const userRef = await firestore
  //   .collection("users")
  //   .where("mentorInfo.categories", "array-contains", "Test")
  //   .get();

  // userRef.forEach(doc => console.log(doc.data()));

  if (!email) return;
  const userRef = await firestore.collection('users').where('email', '==', email);
  const userSnapshot = await userRef.get();

  return !userSnapshot.empty;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const updateUserMentorInfo = async (userId, updatedMentorInfo) => {
  const mentorRef = firestore.collection('users').doc(userId);
  mentorRef.update({ mentorInfo: { ...updatedMentorInfo } });
};

export const setUserPicture = async (userId, pictureBlob) => {
  let pictureDownloadUrl;
  await firebaseStorageRef
    .child(`mentorPictures/${userId}`)
    .put(pictureBlob)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(downloadUrl => {
      pictureDownloadUrl = downloadUrl;
      firestore
        .collection('users')
        .doc(userId)
        .update({ 'mentorInfo.pictureUrl': downloadUrl });
    });
  return pictureDownloadUrl;
};
