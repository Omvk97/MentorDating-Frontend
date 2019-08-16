import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { selectAllMentors } from '../../redux/mentor/mentor.selectors';
import MentorOverviewCard from '../../components/mentor_overview_card/MentorOverviewCard.component';

function Categories({ mentors, match }) {
  const theme = useTheme();
  const gridColumn = useMediaQuery(theme.breakpoints.down('xs'));

  if (!mentors) return null;

  const mentorsToDisplay = match.params.categoryName
    ? mentors.filter(mentor =>
        mentor.mentorInfo.categories.includes(match.params.categoryName)
      )
    : mentors;

  if (mentorsToDisplay.length === 0) return <div>Ingen mentorer</div>;

  return (
    <Grid
      container
      spacing={2}
      justify={gridColumn ? 'center' : 'flex-start'}
      direction={gridColumn ? 'column' : 'row'}
      alignItems={gridColumn ? 'center' : 'flex-start'}>
      {mentorsToDisplay.map(mentor => (
        <React.Fragment key={mentor.id}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  mentors: selectAllMentors,
});

export default withRouter(connect(mapStateToProps)(Categories));
