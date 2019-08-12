import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import useStyles from './MentorOverviewCard.styles';
import ImageLoader from '../image_loader/ImageLoader.component';

function MentorOverviewCard({
  mentor: {
    id,
    displayName,
    mentorInfo: { categories, specializations, pictureUrl },
  },
  history,
}) {
  const classes = useStyles();
  return (
    <Card
      raised
      className={classes.card}
      onClick={() => history.push(`/mentor/${id}/${displayName}`)}>
      <CardActionArea>
        <CardMedia>
          <ImageLoader src={pictureUrl} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {displayName}
          </Typography>
          {categories ? (
            <React.Fragment>
              {categories.map(category => (
                <React.Fragment key={category}>
                  <div>
                    <Typography variant='subtitle2'>{category}</Typography>
                  </div>
                  <div>
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
