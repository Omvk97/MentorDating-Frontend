import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import useStyles from './MentorOverviewCard.styles';

function MentorOverviewCard({
  mentor: {
    id,
    displayName,
    mentorInfo: { specializations, pictureUrl },
  },
  history,
}) {
  const classes = useStyles();
  return (
    <Card raised className={classes.card} onClick={() => history.push(`mentorer/mentor/${id}`)}>
      <CardActionArea>
        <CardMedia>
          <img
            alt='Mentor'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={pictureUrl}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {displayName}
          </Typography>
          {specializations ? (
            <React.Fragment>
              {Object.keys(specializations).map((key, index) => (
                <React.Fragment>
                  <div>
                    <Typography variant='subtitle2'>{key}:</Typography>
                  </div>
                  <div>
                    {specializations[key].map(spec => (
                      <Chip
                        key={spec}
                        className={classes.specializationChip}
                        label={spec}
                        color='primary'
                        size='small'
                        variant='outlined'
                      />
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withRouter(MentorOverviewCard);
