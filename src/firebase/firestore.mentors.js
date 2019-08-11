import { firestore } from './firebase.utils';

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
