import React, { lazy, Suspense, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import useStyles from "./App.styles";
import ErrorBoundary from "./components/error_boundary/ErrorBoundary.component";
import Header from "./components/header/Header.component";
import HomePage from "./pages/home_page/Home.page";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign_in_and_sign_up/SignInAndSignUp.page")
);

const theme = createMuiTheme({
  palette: {
    primary: { main: "#311b92" },
    secondary: { main: "#4caf50" },
    error: { main: "#b71c1c" }
  }
});

function App({ currentUser, checkUserSession }) {
  const classes = useStyles();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Suspense fallback={<LinearProgress color="secondary" />}>
            <Container
              component="main"
              maxWidth="xl"
              className={classes.container}
            >
              <CssBaseline />
              <Route exact path="/" component={HomePage} />
              <Route
                path="/login"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                }
              />
            </Container>
          </Suspense>
        </Switch>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
