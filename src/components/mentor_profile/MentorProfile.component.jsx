import React, { useState } from 'react';
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
import CloudUpload from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import { useTheme } from '@material-ui/core/styles';

import useStyles from './MentorProfile.styles';
import { selectCurrentUser, selectMentorSignUpInfo } from '../../redux/user/user.selectors';
import UploadPicture from './mentor_picture/UploadPicture.component';
import DialogHeader from '../closeable_dialog_header/DialogHeader.component';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function MentorTeachings({ currentUser, mentorSignUpInfo }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openTab, setOpenTab] = useState(0);
  const [uploadPictureDialogOpen, setUploadPictureDialogOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <Paper className={classes.profilePaper}>
      <Dialog
        fullScreen={fullScreen}
        open={uploadPictureDialogOpen}
        onClose={() => setUploadPictureDialogOpen(false)}
        aria-labelledby='form-dialog-title'>
        <DialogHeader onClose={() => setUploadPictureDialogOpen(false)} />
        <DialogContent>
          <UploadPicture />
        </DialogContent>
      </Dialog>

      <Grid container>
        <Grid item xs={12}>
          <div className={classes.banner}>
            <Typography variant='h3' component='h3' gutterBottom>
              {currentUser.displayName}
            </Typography>
            {/* TODO - Edit categories + specialization chips*/}
          </div>
        </Grid>
        <Grid item xs={4}>
          <Card raised className={classes.mentorCard}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
              <CardMedia>
                {mentorSignUpInfo.profile}
                <Tooltip title='Upload billede'>
                  <IconButton
                    aria-label='upload profile picture'
                    color='primary'
                    onClick={() => setUploadPictureDialogOpen(true)}
                    component='span'>
                    <CloudUpload className={classes.uploadButton} />
                  </IconButton>
                </Tooltip>
              </CardMedia>
            </div>
            <CardContent>
              <Typography gutterBottom variant='subtitle2'>
                Mentor siden
              </Typography>
              <Typography gutterBottom variant='body2'>
                -
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                Sidst aktiv
              </Typography>
              <Typography gutterBottom variant='body2'>
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Tabs
            value={openTab}
            onChange={(event, value) => setOpenTab(value)}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
            aria-label='icon tabs'>
            <Tab icon={<DescriptionIcon />} label='Beskrivelse' />
            <Tab icon={<InfoIcon />} label='Information' />
          </Tabs>
          <TabPanel value={openTab} index={0}>
            Lorem Ipsum
          </TabPanel>
          <TabPanel value={openTab} index={1}>
            Lorem Ipsum 2222
          </TabPanel>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  mentorInfo: selectMentorSignUpInfo,
});

export default connect(mapStateToProps)(MentorTeachings);
