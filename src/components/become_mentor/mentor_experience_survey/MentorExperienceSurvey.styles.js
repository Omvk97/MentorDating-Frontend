import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(3),
    width: "60%"
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  label:{
    margin: `0 ${theme.spacing(1)}`,
    fontSize: "1.2em",
    fontStyle: "bold"
  },
  reasonsInput: {
    width: "55%"
  }
}));

export default useStyles;
