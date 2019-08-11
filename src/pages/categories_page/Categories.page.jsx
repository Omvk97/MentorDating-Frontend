import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import { selectAllMentors } from '../../redux/mentor/mentor.selectors';
import useStyles from './Categories.styles';
import MentorOverviewCard from '../../components/mentor_overview_card/MentorOverviewCard.component';

function Categories({ mentors, history }) {
  const classes = useStyles();
  if (mentors == null) return null;
  return (
    <Grid container spacing={2}>
      {mentors.map(mentor => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MentorOverviewCard key={mentor.id} mentor={mentor} />
        </Grid>
      ))}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  mentors: selectAllMentors,
});

export default connect(mapStateToProps)(Categories);
