import { firestore } from './firebase.utils';

export const fetchMentors = () => {
  const mentorsRef = firestore.collection('users').where('role', '==', 'mentor');

  return mentorsRef.get().then(snapshot =>
    snapshot.docs.map(mentorDoc => {
      const id = mentorDoc.id;
      return { id, ...mentorDoc.data() };
    })
  );
};

export const fetchAllCategoryOptions = async () => {
  const categoriesSnapshot = await firestore.collection('categories').get();
  const categoryOptions = categoriesSnapshot.docs.map(categoryDoc => categoryDoc.id);
  return categoryOptions;
};

export const fetchMentorsWtihCategory = category => {

  const mentorsRef = firestore
    .collection('users')
    .where('role', '==', 'mentor')
    .where('mentorInfo.categories', 'array-contains', category);

  return mentorsRef.get().then(snapshot =>
    snapshot.docs.map(mentorDoc => {
      console.log(mentorDoc);

      const id = mentorDoc.id;
      return { id, ...mentorDoc.data() };
    })
  );
};
