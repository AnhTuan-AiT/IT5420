import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router";

const Content = lazy(() => import("../views/Content"));
const CateContent = lazy(() => import("../views/Cate"));
const SearchContent = lazy(() => import("../views/SearchContent"));
const Similar = lazy(() => import("../views/Similar"));

function Routes() {
  return (
    <Switch>
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/"
        exact
      />

      <Route
        render={(props) => <CateContent {...props} hotNews />}
        path="/world"
        exact
      />

      <Route
        render={(props) => <CateContent {...props} hotNews />}
        path="/entertainment"
        exact
      />

      <Route
        render={(props) => <CateContent {...props} hotNews />}
        path="/education"
        exact
      />

      <Route
        render={(props) => <CateContent {...props} hotNews />}
        path="/economy"
        exact
      />

      <Route
        render={(props) => <CateContent {...props} hotNews />}
        path="/sport"
        exact
      />

      <Route component={SearchContent} path="/search/:keyword?" />

      <Route component={Similar} path="/relevant/:id" />

      <Route component={SearchContent} path="/news/paper/:paperName" />

      <Redirect push to="/" />
    </Switch>
  );
}

export default Routes;
