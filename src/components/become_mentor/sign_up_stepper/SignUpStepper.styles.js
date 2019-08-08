import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  controls: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end"
  }
}));
