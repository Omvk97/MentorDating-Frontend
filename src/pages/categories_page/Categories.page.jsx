import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {
  selectMentorsWithCategory,
  selectIsFetchingMentorsWithCategory,
} from '../../redux/mentor/mentor.selectors';
import { fetchMentorsWithCategoryStart } from '../../redux/mentor/mentor.actions';
import MentorOverviewCard from '../../components/mentor_overview_card/MentorOverviewCard.component';
import useStyles from './Categories.styles';

function Categories({ mentors, match, fetchMentorsWithCategory, isFetchingMentors }) {
  const classes = useStyles();
  const theme = useTheme();
  const gridColumn = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    fetchMentorsWithCategory(match.params.categoryName);
  }, [fetchMentorsWithCategory, match.params.categoryName]);

  if (isFetchingMentors)
    return <CircularProgress color='secondary' size={75} className={classes.loader} />;
  if (mentors.length === 0) return <div>Ingen mentorer</div>;

  return (
    <Grid container spacing={2} justify='center' direction={gridColumn ? 'column' : 'row'} alignItems='center'>
      {mentors.map(mentor => (
        <React.Fragment key={mentor.id}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MentorOverviewCard mentor={mentor} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  mentors: selectMentorsWithCategory,
  isFetchingMentors: selectIsFetchingMentorsWithCategory,
});

const mapDispatchToProps = dispatch => ({
  fetchMentorsWithCategory: category => dispatch(fetchMentorsWithCategoryStart(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
