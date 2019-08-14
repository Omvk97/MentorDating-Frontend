import { createSelector } from 'reselect';

const selectMentorState = state => state.mentor;

export const selectAllMentors = createSelector(
  [selectMentorState],
  mentor => mentor.mentors
);

export const selectisMentorsFetching = createSelector(
  [selectMentorState],
  mentor => mentor.isFetching
);

export const selectCategoryOptions = createSelector(
  [selectMentorState],
  mentor => mentor.categoryOptions
);
