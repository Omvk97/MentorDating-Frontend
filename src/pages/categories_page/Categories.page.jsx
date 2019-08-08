import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { selectAllMentors } from "../../redux/mentor/mentor.selectors";
import useStyles from "./Categories.styles";

function Categories({ mentors, history }) {
  const classes = useStyles();
  if (mentors == null) return null;

  return mentors.map(mentor => {
    console.log(mentor.teachings);
    const { mentorId, pictureUrl, displayName } = mentor;

    return (
      <Card
        raised
        key={mentorId}
        className={classes.card}
        onClick={() => history.push(`mentor/${mentorId}`)}
      >
        <CardActionArea>
          <CardMedia>
            <img
              alt="Mentor"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={pictureUrl}
            />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {displayName}
            </Typography>
            {mentor.teachings.map(teaching => (
              <Typography
                key={teaching.category}
                variant="body2"
                color="textSecondary"
                component="div"
              >
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
  });
}

const mapStateToProps = createStructuredSelector({
  mentors: selectAllMentors
});

export default connect(mapStateToProps)(Categories);
