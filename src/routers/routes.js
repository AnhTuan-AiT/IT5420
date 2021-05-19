import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router";

const Content = lazy(() => import("../views/Content"));
const CateContent = lazy(() => import("../views/CateContent"));

function Routes() {
  return (
    <Switch>
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/"
        exact
      />
      <Route
        render={(props) => <CateContent {...props} />}
        path="/news"
        exact
      />
      <Route
        render={(props) => <CateContent {...props} />}
        path="/world"
        exact
      />
      <Route
        render={(props) => <CateContent {...props} />}
        path="/society"
        exact
      />
      <Route
        render={(props) => <CateContent {...props} />}
        path="/economy"
        exact
      />
      <Route
        render={(props) => <CateContent {...props} />}
        path="/sport"
        exact
      />
      <Route component={Content} path="/search/:keyword?" />
      <Route component={Content} path="/news/paper/:paperName" />
      <Redirect push to="/" />
    </Switch>
  );
}

export default Routes;
