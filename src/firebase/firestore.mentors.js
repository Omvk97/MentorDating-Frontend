import { firestore } from './firebase.utils';
import { createUserProfileDocument } from './firestore.users';

export const createMentorProfileDoc = async (mentorAuth, mentorData) => {
  const mentorRef = firestore.doc(`mentors/${mentorAuth.uid}`);

  const { displayName } = mentorAuth;

  await mentorRef
    .get()
    .then(snapShot => {
      if (!snapShot.exists) {
        const {
          description,
          phone,
          pictureUrl,
          teachingInformation,
          teachings,
        } = mentorData;
        const mentorSince = new Date();

        mentorRef.set({
          displayName,
          mentorSince,
          description,
          phone,
          pictureUrl,
          teachingInformation,
          teachings,
        });
      }
    })
    .catch(error => {
      console.log('Error creating mentor', error.message);
    });

  const additionalData = {
    mentorInfo: mentorAuth.uid,
    displayName,
  };
  createUserProfileDocument(mentorAuth, additionalData);

  return mentorRef;
};

export const createMentorProfile = async user => {
  firestore
    .collection('mentors')
    .doc(user.id)
    .set({
      description: 'descriptionTEST DEN HER BURDE VÆRE HER NU',
      phone: 30748574,
      pictureUrl:
        'https://bloximages.chicago2.vip.townnews.com/tribdem.com/content/tncms/assets/v3/editorial/3/83/38384be2-3ba5-11e8-adec-bf48bc62810f/5acadc92f3c7d.image.jpg?resize=400%2C357',
      mentorSince: new Date(),
      teachingInformation: 'Teaching information t',
      teachings: [
        {
          categoryName: 'Software',
          specializations: ['Test', 'Test2', 'Test3'],
        },
        {
          categoryName: 'FDKasdas',
          specializations: ['Test4', 'Test5', 'Test74'],
        },
      ],
      displayName: user.displayName,
    });
  firestore
    .collection('users')
    .doc(user.id)
    .update({ role: 'mentor' });
  user.role = 'mentor';
  console.log(user);

  return user;
};

export const fetchMentors = async () => {
  const mentorsSnapshot = await firestore.collection('mentors').get();

  return mentorsSnapshot.docs.map(mentorDoc => {
    const mentorId = mentorDoc.id;
    return { mentorId, ...mentorDoc.data() };
  });
};

export const fetchAllCategoryOptions = async () => {
  const categoriesSnapshot = await firestore.collection('categories').get();
  const categoryOptions = categoriesSnapshot.docs.map(categoryDoc => categoryDoc.id);
  return categoryOptions;
};
