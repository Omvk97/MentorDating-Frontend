import { firestore } from './firebase.utils';

export const fetchMentors = async () => {
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
