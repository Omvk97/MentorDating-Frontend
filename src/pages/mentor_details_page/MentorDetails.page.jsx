import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import BookIcon from '@material-ui/icons/Book';
import DescriptionIcon from '@material-ui/icons/Description';

import useStyles from './MentorDetails.styles';
import { setupNewConversationStart } from '../../redux/conversation/conversation.actions';
import { selectAllMentors } from '../../redux/mentor/mentor.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

function MentorDetails({ match, mentors, currentUser, setupNewConversation, history }) {
  const [currentTab, setCurrentTab] = React.useState(0);
  const mentorId = match.params.mentorId;
  const classes = useStyles();

  if (!mentors) return null;

  const mentor = mentors.find(mentor => mentor.id === mentorId);
  const {
    categories,
    pictureUrl,
    mentorSince,
    contactPhone,
    contactEmail,
    description,
    teachingInformation,
    specializations,
  } = mentor.mentorInfo;
  const { displayName } = mentor;

  function startNewConversation() {
    if (!currentUser) {
      history.push('/logind');
      return;
    }
    if (currentUser.id !== mentor.id) { // mentors can't contact themselves
      setupNewConversation(currentUser, mentor);
      history.push('/beskeder')
    }
  }

  return (
    <Paper className={classes.profilePaper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.banner}>
            <Typography variant='h3'>{displayName}</Typography>
            {categories.map(category => (
              <Grid container item key={category} justify='center' alignItems='center'>
                <Grid item xs={2} md={1}>
                  <Typography variant='subtitle2'>{category}</Typography>
                </Grid>
                <Grid item xs={10} md={11}>
                  {specializations[category]
                    ? specializations[category].map(spec => (
                        <Chip
                          key={spec}
                          className={classes.specializationChip}
                          label={spec}
                          color='primary'
                          size='small'
                          variant='outlined'
                        />
                      ))
                    : null}
                </Grid>
              </Grid>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card raised className={classes.mentorCard}>
            <CardMedia className={classes.media} title='Mentor Billede'>
              <img
                alt='Mentor'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={pictureUrl}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant='subtitle2'>
                Mentor siden
              </Typography>
              <Typography gutterBottom variant='body2'>
                {new Date(mentorSince.seconds * 1000).toLocaleDateString('da-DK')}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Sidst aktiv
              </Typography>
              <Typography gutterBottom variant='body2'>
                -
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Telefon
              </Typography>
              <Typography gutterBottom variant='body2'>
                {contactPhone}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Email
              </Typography>
              <Typography gutterBottom variant='body2'>
                {contactEmail}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={startNewConversation}>
                {`Skriv til ${displayName.slice(0, displayName.indexOf(' '))}`}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Tabs
            value={currentTab}
            onChange={(event, value) => setCurrentTab(value)}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
            aria-label='icon tabs'>
            <Tab icon={<BookIcon />} label='Undervisning' />
            <Tab icon={<DescriptionIcon />} label='Beskrivelse' />
          </Tabs>
          <Box
            p={2}
            component='div'
            role='tabpanel'
            hidden={currentTab !== 0}
            id='undervisning'
            aria-labelledby='tab-undervisning'>
            <Typography variant='body1' style={{ overflowWrap: 'break-word' }}>
              {description}
            </Typography>
          </Box>
          <Box
            p={2}
            component='div'
            role='tabpanel'
            hidden={currentTab !== 1}
            id='information'
            aria-labelledby='information'>
            <Typography variant='body1'>{teachingInformation}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  mentors: selectAllMentors,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setupNewConversation: (user, mentor) =>
    dispatch(setupNewConversationStart({ user, mentor })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MentorDetails);
