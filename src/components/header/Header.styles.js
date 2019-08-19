import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#fff"
  },
  inputRoot: {
    color: "inherit"
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main
  },
  logInButton: {
    margin: theme.spacing(1)
  }
}));