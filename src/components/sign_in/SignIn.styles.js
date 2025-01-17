import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formLoginIcon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signInWithOthers: {
    marginTop: theme.spacing(4)
  }
}));

export default useStyles;

export const buttonSignInTheme = createMuiTheme({
  palette: {
    primary: { main: "#DB4437" }, // Google sign in color
    secondary: { main: "#38A1F3" } // Twitter sign in color
  }
});
