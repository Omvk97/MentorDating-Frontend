import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import BookIcon from '@material-ui/icons/Book';
import DescriptionIcon from '@material-ui/icons/Description';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from './MentorProfile.styles';
import UploadPicture from './mentor_picture/UploadPicture.component';
import DialogHeader from '../closeable_dialog_header/DialogHeader.component';
import EditableText from '../editable_text/EditableText.component';
import MentorBanner from './mentor_banner/MentorBanner.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  updateMentorInfoStart,
  temporaryMentorInfoSave,
} from '../../redux/user/user.actions';

function MentorTeachings({
  currentUser,
  updateMentorInfoStart,
  temporaryMentorInfoSave,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [currentTab, setCurrentTab] = useState(0);
  const [uploadPictureDialogOpen, setUploadPictureDialogOpen] = useState(false);
  const [mentorInfoClone, setMentorInfoClone] = useState(null);
  const [mentorInfoHasChanged, setMentorInfoHasChanged] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setMentorInfoClone(Object.assign({}, currentUser.mentorInfo));
    }
    return () => {};
  }, [currentUser]);

  if (!currentUser || !mentorInfoClone) return null;
  const {
    categories,
    contactEmail,
    description,
    contactPhone,
    pictureUrl,
    teachingInformation,
    mentorSince,
    specializations,
  } = mentorInfoClone;

  function onChange(newValue, field, categoryToDelete) {
    setMentorInfoHasChanged(true);

    switch (field) {
      case 'description':
        setMentorInfoClone({ ...mentorInfoClone, description: newValue });
        break;
      case 'undervisning':
        setMentorInfoClone({ ...mentorInfoClone, teachingInformation: newValue });
        break;
      case 'categories':
        const specializationClone = Object.assign({}, specializations);
        delete specializationClone[categoryToDelete];
        console.log(specializationClone);

        setMentorInfoClone({
          ...mentorInfoClone,
          categories: newValue,
          specializations: specializationClone,
        });
        break;
      case 'specializations':
        setMentorInfoClone({
          ...mentorInfoClone,
          specializations: { ...specializations, ...newValue },
        });
        break;
      default:
        break;
    }
  }

  function onSave() {
    setMentorInfoHasChanged(false);
    updateMentorInfoStart(currentUser.id, mentorInfoClone);
  }

  function onUploadProfilePicture() {
    temporaryMentorInfoSave(mentorInfoClone);
    setUploadPictureDialogOpen(true);
  }

  function onUploadDialogClose() {
    setUploadPictureDialogOpen(false);
  }

  return (
    <React.Fragment>
      <Paper className={classes.profilePaper}>
        <Grid container>
          <Grid item xs={12}>
            <MentorBanner
              onChange={onChange}
              categories={categories}
              specializations={specializations}
            />
          </Grid>
          <Grid item xs={4}>
            <Card raised className={classes.mentorCard}>
              {pictureUrl ? (
                <CardMedia className={classes.media} title='Mentor Billede'>
                  <div className={classes.imageContainer}>
                    <img
                      alt='Mentor'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      src={pictureUrl}
                    />
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={onUploadProfilePicture}
                      className={classes.uploadButton}>
                      Upload Nyt profil billede
                    </Button>
                  </div>
                </CardMedia>
              ) : null}
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
              <EditableText
                id='teachingInformation'
                multiline
                tooltipTitle='undervisnings tekst'
                variant='body1'
                value={description}
                onChange={event => onChange(event.target.value, 'description')}
              />
            </Box>
            <Box
              p={2}
              component='div'
              role='tabpanel'
              hidden={currentTab !== 1}
              id='information'
              aria-labelledby='information'>
              <EditableText
                id='description'
                tooltipTitle='beskrivelses tekst'
                multiline
                variant='body1'
                value={teachingInformation}
                onChange={event => onChange(event.target.value, 'undervisning')}
              />
            </Box>
          </Grid>
        </Grid>

        <Dialog
          fullScreen={fullScreen}
          open={uploadPictureDialogOpen}
          onClose={() => setUploadPictureDialogOpen(false)}
          aria-labelledby='form-dialog-title'>
          <DialogHeader onClose={() => setUploadPictureDialogOpen(false)} />
          <DialogContent>
            <UploadPicture onUpload={onUploadDialogClose} />
          </DialogContent>
        </Dialog>
      </Paper>
      {mentorInfoHasChanged ? (
        <Grid container justify='flex-end'>
          <Button
            onClick={onSave}
            variant='contained'
            color='secondary'
            className={classes.saveIconContainer}>
            <SaveIcon className={classes.saveIcon} />
            Gem
          </Button>
        </Grid>
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  updateMentorInfoStart: (userId, updatedMentorInfo) =>
    dispatch(updateMentorInfoStart({ userId, updatedMentorInfo })),
  temporaryMentorInfoSave: mentorInfoClone =>
    dispatch(temporaryMentorInfoSave(mentorInfoClone)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MentorTeachings);
