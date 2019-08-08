import { createSelector } from "reselect";

const selectMentor = state => state.mentor;

export const selectAllMentors = createSelector(
  [selectMentor],
  mentor => mentor.mentors
);

export const selectisMentorsFetching = createSelector(
  [selectMentor],
  mentor => mentor.isFetching
);
