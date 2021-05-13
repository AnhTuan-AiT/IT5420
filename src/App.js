import { CssBaseline, LinearProgress } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import { Suspense } from "react";
import { Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Routes from "./routers/routes";

export const history = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    fontFamily: `-apple-system, "Segoe UI", BlinkMacSystemFont, "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100%",
          backgroundColor: "#fff",
        },
      },
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Suspense fallback={<LinearProgress />}>
          <Layout>
            <Routes />
          </Layout>
        </Suspense>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
