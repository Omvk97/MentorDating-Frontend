import { firestore } from './firebase.utils';

export const fetchAllCategoryOptions = async () => {
  const categoriesSnapshot = await firestore.collection('categories').get();
  const categoryOptions = categoriesSnapshot.docs.map(categoryDoc => categoryDoc.id);
  return categoryOptions;
};
