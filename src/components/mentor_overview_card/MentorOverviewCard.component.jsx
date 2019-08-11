import React from 'react';
import {withRouter} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useStyles from './MentorOverviewCard.styles';

function MentorOverviewCard({ mentor: { mentorId, displayName, teachings, pictureUrl }, history }) {
  const classes = useStyles();
  return (
    <Card
      raised
      className={classes.card}
      onClick={() => history.push(`mentor/${mentorId}`)}>
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
          {teachings.map(teaching => (
            <Typography
              key={teaching.category}
              variant='body2'
              color='textSecondary'
              component='div'>
              <p>
                <strong>{teaching.category}: </strong>
                {teaching.specializations.map(speci => `${speci} `)}
              </p>
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withRouter(MentorOverviewCard);
