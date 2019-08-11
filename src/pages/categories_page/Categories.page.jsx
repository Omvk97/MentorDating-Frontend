import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAllMentors } from '../../redux/mentor/mentor.selectors';
import useStyles from './Categories.styles';
import MentorOverviewCard from '../../components/mentor_overview_card/MentorOverviewCard.component';

function Categories({ mentors, history }) {
  const classes = useStyles();
  if (mentors == null) return null;

  return mentors.map(mentor => (
    <MentorOverviewCard key={mentor.mentorId} mentor={mentor} />
  ));
}

const mapStateToProps = createStructuredSelector({
  mentors: selectAllMentors,
});

export default connect(mapStateToProps)(Categories);
