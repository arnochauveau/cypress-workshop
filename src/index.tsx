import { createTheme, ThemeProvider } from "@material-ui/core";
/* istanbul ignore next */
// @ts-ignore
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
});

/* istanbul ignore if */
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
