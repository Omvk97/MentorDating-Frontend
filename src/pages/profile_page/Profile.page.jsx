import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import useStyles from './Profile.styles';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import MentorProfile from '../../components/mentor_profile/MentorProfile.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Profile({ currentUser, history }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  function handleChange(event, newValue) {
    setCurrentTab(newValue);
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Tabs
          orientation='vertical'
          value={currentTab}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}>
          <Tab label='Generelt' />
          <Tab label='Sikkerhed og login' />
          {currentUser ? <Tab label='Din Mentor Side' /> : null}
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <Box
          p={3}
          component='div'
          role='tabpanel'
          hidden={currentTab !== 0}
          id={'generelt'}
          aria-labelledby={'generelt'}>
          <Typography variant='h6'>
            TODO - Skifte email og telefonnummer og anmode om at skifte navn
          </Typography>
        </Box>
        <Box
          p={3}
          component='div'
          role='tabpanel'
          hidden={currentTab !== 1}
          id={'sikkerhedOgLogin'}
          aria-labelledby={'sikkerhed og login'}>
          <Typography variant='h6'>
            TODO - Skifte kodeord og sætte to-trins bekræftelse + sende email verificering
            igen
          </Typography>
        </Box>
        <Box
          p={3}
          component='div'
          role='tabpanel'
          hidden={currentTab !== 2}
          id={'mentorside'}
          aria-labelledby={'mentorside'}>
          <MentorProfile switchTab={handleChange} />
        </Box>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Profile);
