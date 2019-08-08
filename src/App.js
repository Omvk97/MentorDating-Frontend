import React, { lazy, Suspense, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import ScrollToTop from './components/scroll_to_top_hoc/ScrollToTop.component.jsx';
import useStyles from "./App.styles";
import ErrorBoundary from "./components/error_boundary/ErrorBoundary.component";
import Header from "./components/header/Header.component";
import HomePage from "./pages/home_page/Home.page";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { fetchMentorsStart } from "./redux/mentor/mentor.actions";
import Footer from "./components/footer/Footer.component";

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign_in_and_sign_up/SignInAndSignUp.page")
);
const CategoriesPage = lazy(() =>
  import("./pages/categories_page/Categories.page")
);
const WorkshopsPage = lazy(() =>
  import("./pages/workshops_page/Workshops.page")
);
const MentorSignUpPage = lazy(() =>
  import("./pages/mentor_sign_up_page/MentorSignUp.page")
);

const theme = createMuiTheme({
  palette: {
    primary: { main: "#540796" },
    secondary: { main: "#4caf50" },
    error: { main: "#b71c1c" }
  }
});

function App({ currentUser, checkUserSession, fetchMentorsStart }) {
  const classes = useStyles();

  useEffect(() => {
    checkUserSession();
    fetchMentorsStart();
  }, [checkUserSession, fetchMentorsStart]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div className={classes.toolbarCss} />
      <ScrollToTop />
      <Switch>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <Container component="main" maxWidth="lg" className={classes.main}>
            <ErrorBoundary>
              <Route exact path="/" component={HomePage} />
              <Route
                path="/login"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                }
              />
              <Route path="/mentors/categories" component={CategoriesPage} />
              <Route path="/workshops" component={WorkshopsPage} />
              <Route path="/mentor/signup" component={MentorSignUpPage} />
            </ErrorBoundary>
          </Container>
          <Footer />
        </Suspense>
      </Switch>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchMentorsStart: () => dispatch(fetchMentorsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
