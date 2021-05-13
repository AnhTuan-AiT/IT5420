import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router";

const Content = lazy(() => import("../views/Content"));

function Routes() {
  return (
    <Switch>
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/"
        exact
      />
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/new"
        exact
      />
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/world"
        exact
      />
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/society"
        exact
      />
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/economy"
        exact
      />
      <Route
        render={(props) => <Content {...props} hotNews />}
        path="/sport"
        exact
      />
      <Route component={Content} path="/search/:keyword?" />
      <Route component={Content} path="/paper/:name" />
      <Redirect push to="/" />
    </Switch>
  );
}

export default Routes;
