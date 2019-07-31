import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';

import useStyles from './App.styles';

import SignIn from "./components/sign_in/SignIn.component";
import Header from './components/header/Header.component'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <SignIn />
    </Container>
    </ThemeProvider>
  );
}

export default App;
