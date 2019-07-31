import React from "react";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";

import useStyles from "./App.styles";
import ErrorBoundary from "./components/error_boundary/ErrorBoundary.component";
import Header from "./components/header/Header.component";
import HomePage from "./pages/home_page/Home.page";
import SignInAndSignUp from "./pages/sign_in_and_sign_up/SignInAndSignUp.page";

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  }
});

function App() {
  useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={SignInAndSignUp} />
          </Switch>
        </ErrorBoundary>
      </Container>
    </ThemeProvider>
  );
}

export default App;
